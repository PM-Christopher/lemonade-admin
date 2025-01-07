export const formatDate = (dateString: Date) => {
    if(dateString) {
        const date = new Date(dateString)

        const dayMonthFormatter = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long'
        })

        return dayMonthFormatter.format(date);
    }
    return null
}

export const formatLongDate = (dateString: Date, type="long") => {
    if(dateString) {
        const date = new Date(dateString)
        if(type === "long") {
            const dayMonthFormatter = new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'long',
                year: "numeric"
            })

            return dayMonthFormatter.format(date);
        } else if(type === "mid") {
            const dayMonthFormatter = new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
                weekday: "short"
            })

            return dayMonthFormatter.format(date);
        }
    }
    return null;
}

export const formatTime = (dateString: Date) => {
    if(dateString) {
        const date = new Date(dateString)

        const timeFormatter = new Intl.DateTimeFormat('en-GB', {
            hour: 'numeric',
            hour12: true,
        });

        return timeFormatter.format(date).toUpperCase();
    }
    return null
}

export const formatLongTime = (dateString: Date) => {
    if(dateString) {
        const date = new Date(dateString)

        const timeFormatter = new Intl.DateTimeFormat('en-GB', {
            hour: 'numeric',
            minute: "numeric",
            hour12: true,
        });

        return timeFormatter.format(date).toUpperCase();
    }
    return null
}
