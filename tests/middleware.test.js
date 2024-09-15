import { NextRequest } from "next/server";

import middleware from '~/middleware';

function createRequest (url) {
    return new NextRequest(url);
}

function createRequestWithSessionTokenCookie (url, { sessionToken }) {
    return new NextRequest(url, {
        headers: {
            cookie: `session_token=${sessionToken}`
        }
    });
}

function mockFetchWithResponse ({ success, valid }) {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
            success,
            valid,
        })
    });
}

function mockFetchWithNetworkError () {
    global.fetch = vi.fn().mockRejectedValue(new Error());
}

function expectCookieToBeDeleted (response) {
    expect(response.headers.get('Set-Cookie')).toBe('session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
}

function expectCookieToBePreserved (response) {
    expect(response.headers.get('Set-Cookie')).toBe(null);
}

function expectToBeRedirectedTo (response, path) {
    const locationUrl = new URL(path, 'http://localhost:3000');
    
    expect(response.status).toBe(307);
    expect(response.headers.get('Location')).toBe(locationUrl.toString());
}

function expectToBeNotRedirected (response) {
    expect(response.status).toBe(200);
    expect(response.headers.get('Location')).toBe(null);
}

describe('Middleware', () => {
    it('Should redirect to /sign-in when try to access / without session token cookie', async () => {
        const request = createRequest(new URL('/', 'http://localhost:3000'));
        
        const response = await middleware(request);

        expectToBeRedirectedTo(response, '/sign-in');
    });
    
    it('Should redirect to /sign-in when try to access / with empty session token cookie', async () => {
        const request = createRequestWithSessionTokenCookie(new URL('/', 'http://localhost:3000'), {
            sessionToken: ''
        });

        const response = await middleware(request);

        expectToBeRedirectedTo(response, '/sign-in');
    });

    it('Should delete cookie when try to access / with empty session token cookie', async () => {
        const request = createRequestWithSessionTokenCookie(new URL('/', 'http://localhost:3000'), {
            sessionToken: ''
        });

        const response = await middleware(request);

        expectCookieToBeDeleted(response);
    });
    
    it('Should redirect to /sign-in when try to access / with invalid session token cookie', async () => {
        const request = createRequestWithSessionTokenCookie(new URL('/', 'http://localhost:3000'), {
            sessionToken: 'invalid'
        });

        mockFetchWithResponse({
            success: true,
            valid: false,
        });

        const response = await middleware(request);

        expectToBeRedirectedTo(response, '/sign-in');
    });

    it('Should delete cookie when try to access / with invalid session token cookie', async () => {
        const request = createRequestWithSessionTokenCookie(new URL('/', 'http://localhost:3000'), {
            sessionToken: 'invalid'
        });

        mockFetchWithResponse({
            success: true,
            valid: false,
        });

        const response = await middleware(request);

        expectCookieToBeDeleted(response);
    });

    it.each([
        '/sign-in',
        '/sign-up'
    ])('Should redirect to / when try to access %s with valid session token', async (path) => {
        const request = createRequestWithSessionTokenCookie(new URL(path, 'http://localhost:3000'), {
            sessionToken: 'valid'
        });

        mockFetchWithResponse({
            success: true,
            valid: true,
        });
        
        const response = await middleware(request);

        expectToBeRedirectedTo(response, '/');
        expectCookieToBePreserved(response);
    });

    it.each([
        '/',
        '/sign-in',
        '/sign-up',
    ])('Should redirect to /internal-server-error when try to access %s and validation service is unreachable', async (path) => {
        const request = createRequestWithSessionTokenCookie(new URL(path, 'http://localhost:3000'), {
            sessionToken: 'it-does-not-matter'
        });

        mockFetchWithNetworkError();

        const response = await middleware(request);

        expectToBeRedirectedTo(response, '/internal-server-error');
        expectCookieToBePreserved(response);
    });

    it.each([
        '/',
        '/sign-in',
        '/sign-up',
    ])('Should redirect to /internal-server-error when try to access %s and validation service is unavailable', async (path) => {
        const request = createRequestWithSessionTokenCookie(new URL(path, 'http://localhost:3000'), {
            sessionToken: 'it-does-not-matter'
        });

        mockFetchWithResponse({
            success: false,
            valid: false,
        });

        const response = await middleware(request);

        expectToBeRedirectedTo(response, '/internal-server-error');
        expectCookieToBePreserved(response);
    });
    
    it('Should not redirect elsewhere when trying to access /internal-server-error', async () => {
        const request = createRequest(new URL('/internal-server-error', 'http://localhost:3000'));

        const response = await middleware(request);

        expectToBeNotRedirected(response);
    });
});