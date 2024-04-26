import Detail from './detail';
import DetailHeader from './detail-header';
import DetailText from './detail-text';
import DetailRow from './detail-row';

export const Default = {
    render: () => (
        <DetailRow>
            <Detail>
                <DetailHeader>
                    Lorem ipsum
                </DetailHeader>

                <DetailText>
                    Lorem ipsum dolor sit amet
                </DetailText>
            </Detail>

            <Detail>
                <DetailHeader>
                    Lorem ipsum
                </DetailHeader>

                <DetailText>
                    Lorem ipsum dolor sit amet
                </DetailText>
            </Detail>

            <Detail>
                <DetailHeader>
                    Lorem ipsum
                </DetailHeader>

                <DetailText>
                    Lorem ipsum dolor sit amet
                </DetailText>
            </Detail>
        </DetailRow>
    )
};

export default {
    component: Detail
};
