export function formatUserJoinDate(createdAt: Date) {
	return `Joined ${getFormatedDate(createdAt)}`;
}

export function getFormatedDate(
	date: Date,
	dateStyle: "full" | "long" | "medium" | "short" = "long"
) {
	return Intl.DateTimeFormat("en", { dateStyle }).format(date);
}
