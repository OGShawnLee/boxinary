const STRING_MONTHS = Object.freeze({
	0: "January",
	1: "February",
	2: "March",
	3: "April",
	4: "May",
	5: "June",
	6: "July",
	7: "August",
	8: "September",
	9: "October",
	10: "November",
	11: "December"
});

export function formatUserJoinDate(createdAt: Date) {
	const month = createdAt.getMonth() as keyof typeof STRING_MONTHS;
	const stringMonth = STRING_MONTHS[month];
	const date = createdAt.getDate();
	return `Joined ${stringMonth} ${date}, ${createdAt.getFullYear()}`;
}

export function getFormatedDate(date: Date) {
	return `${date.getDate()} ${getStringMonth(date.getMonth())} ${date.getFullYear()}`;
}

export function getStringMonth(month: number) {
	return STRING_MONTHS[month as keyof typeof STRING_MONTHS];
}
