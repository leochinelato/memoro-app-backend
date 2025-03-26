export class TaskValidator {
    static validateTaskDates(startsAt?: Date, endsAt?: Date) {
        const now = new Date()

        if (startsAt && startsAt < now) {
            throw new Error('Invalid date.');
        }

        if (endsAt && endsAt < now) {
            throw new Error('Invalid date.');
        }

        if (startsAt && endsAt && endsAt <= startsAt) {
            throw new Error('Invalid date.');
        }
    }
}

