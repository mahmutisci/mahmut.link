export default async function sitemap() {
	const routes = [
		"",
		// "/changelog",
		// "/notes",
		// "/projects",
		// "/stack",
		// "/colophon",
		// --- others
	].map((route) => ({
		url: `https://mahmut.link${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes];
}
