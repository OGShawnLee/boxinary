export function formatUserJoinDate(createdAt: Date) {
	return `Joined ${getFormatedDate(createdAt)}`;
}

export function getFormatedDate(date: Date) {
	return Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}
