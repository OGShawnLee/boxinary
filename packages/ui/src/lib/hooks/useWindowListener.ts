export default function useWindowListener<K extends keyof WindowEventMap>(
	type: K,
	callback: (this: Window, event: WindowEventMap[K]) => void,
	options?: AddEventListenerOptions | boolean
) {
	window.addEventListener(type, callback, options);
	return () => {
		window.removeEventListener(type, callback, options);
	};
}
