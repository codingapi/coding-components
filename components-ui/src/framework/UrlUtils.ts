class UrlUtils{

    public static getParameterByName(name: string, url: string): string {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");

        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);

        if (!results) return "";
        if (!results[2]) return "";

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    public static getParameterByNameFromUrl(name: string): string {
        return this.getParameterByName(name, window.location.href);
    }

    public static getParameterByNameFromQueryString(name: string): string {
        return this.getParameterByName(name, window.location.search);
    }

    public static getParameterByNameFromHash(name: string): string {
        return this.getParameterByName(name, window.location.hash);
    }

    public static getParameterByNameFromPath(name: string): string {
        return this.getParameterByName(name, window.location.pathname);
    }

    public static getParameterByNameFromUrlWithHash(name: string): string {
        return this.getParameterByName(name, window.location.href + window.location.hash);
    }

    public static getParameterByNameFromUrlWithQueryString(name: string): string {
        return this.getParameterByName(name, window.location.href + window.location.search);
    }

    public static getParameterByNameFromUrlWithQueryStringAndHash(name: string): string {
        return this.getParameterByName(name, window.location.href + window.location.search + window.location.hash);
    }

    public static getParameterByNameFromUrlWithQueryStringAndPath(name: string): string {
        return this.getParameterByName(name, window.location.href + window.location.search + window.location.pathname);
    }

    public static getParameterByNameFromUrlWithHashAndPath(name: string): string {
        return this.getParameterByName(name, window.location.href + window.location.hash + window.location.pathname);
    }

    public static getParameterByNameFromUrlWithHashAndPathAndQueryString(name: string): string {
        return this.getParameterByName(name, window.location.href + window.location.hash + window.location.pathname + window.location.search);
    }

    public static getParameterByNameFromUrlWithHashAndQueryString(name: string): string {
        return this.getParameterByName(name, window.location.href + window.location.hash + window.location.search);
    }

    public static getFilenameFromUrl(url: string): string {
        return (url.split('/').pop() as string) || '';
    }

    public static getFileTypeFromUrl(url: string): string {
        return (url.split('.').pop() as string) || '';
    }

}

export { UrlUtils };