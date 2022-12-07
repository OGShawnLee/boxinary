import type { RequestHandler } from "@sveltejs/kit";
import { deleteAuthCookie } from "@server/utils";

export const POST: RequestHandler = ({ cookies }) => {
	deleteAuthCookie(cookies);
	return new Response(null, { status: 303, headers: { location: "/auth/sign-in" } });
};
