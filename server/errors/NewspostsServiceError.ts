class NewspostsServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NewspostServiceError";
		
	}
}
export {NewspostsServiceError}