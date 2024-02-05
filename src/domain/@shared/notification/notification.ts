export type NotificationErrorProps = {
    message: string;
    context: string;
};

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    messages(context?: string): string {
        let messages = "";
        this.errors.forEach(e => {
            if (e.context === context || !context) {
                messages += `${e.context}: ${e.message},`;
            }
        });
        return messages;
    }

    hasErrors(context?: string): boolean {
        return this.errors.some(e => e.context === context || !context);
    }

    getErrors() {
        return this.errors;
    }
}