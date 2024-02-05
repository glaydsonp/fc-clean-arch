export type NotificationError = {
    message: string;
    context: string;
};

export default class Notification {
    private errors: NotificationError[] = [];

    addError(error: NotificationError) {
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
}