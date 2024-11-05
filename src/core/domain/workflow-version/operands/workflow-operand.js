export default class WorkflowOperand {
    evaluate (context) {
        throw new Error(`Not implemented for ${this.constructor.name}.`);
    }
}


