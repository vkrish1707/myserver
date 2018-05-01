import { elipsis } from '../utilities/strUtil';

export class Alert {
    id: number;
    message: string;
    icon: string;
    private dismissed: boolean;

    constructor() {
        this.dismissed = false;
    }

    get elipsisMessage(): string {
        return elipsis(this.message);
    }

    get iconType(): string {
        let result: string = 'error';
        if (this.icon == 'success' || this.icon == 'info' || this.icon == 'error' || this.icon == 'warning') {
            result = this.icon;
        }

        return result;
    }

    public dismiss(): void {
        this.dismissed = true;
    }

    get isActive(): boolean {
        return (this.dismissed == false);
    }

    get canDismiss(): boolean {
        return (this.id != 0);
    }
}
