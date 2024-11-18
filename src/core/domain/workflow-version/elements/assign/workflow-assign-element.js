import WorkflowAssignment from '~/core/domain/workflow-version/elements/assign/workflow-assignment';
import WorkflowElement from '../workflow-element';

export default class WorkflowAssignElement extends WorkflowElement {
    static createAssignment (assignmentData) {
        return new WorkflowAssignment(assignmentData);
    }

    constructor({
        id,
        positionX,
        positionY,
        name,
        description,
        assignments,
        nextElementId,
    }) {
        super({
            id,
            positionX,
            positionY,
        });

        if (!name) {
            throw new Error('Name is required.');
        }

        if (description == null) {
            throw new Error('Description cannot be null.');
        }

        if (!assignments) {
            throw new Error('Assignments are required.');
        }

        this.name = name;
        this.description = description;
        this.nextElementId = nextElementId;

        this.assignments = assignments.map(assignment => WorkflowAssignElement.createAssignment(assignment));
    }

    getType () {
        return 'assign';
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getAssignments() {
        return this.assignments;
    }

    getNextElementId () {
        return this.nextElementId;
    }

    setNextElementId (nextElementId) {
        this.nextElementId = nextElementId;
    }

    setDefaultNextElementId (defaultNextElementId) {
        this.nextElementId = defaultNextElementId;
    }

    execute (context) {
        for (const assignment of this.assignments) {
            assignment.assign(context);
        }

        return this.nextElementId;
    }
}