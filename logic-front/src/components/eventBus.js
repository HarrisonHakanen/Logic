export const userEventBus = {
    emit: (name, data) => {
        window.dispatchEvent(new CustomEvent(name, { detail: data }));
    },
    subscribe: (name, callback) => {
        window.addEventListener(name, (e) => callback(e.detail));
    },
    unsubscribe: (name, callback) => {
        window.removeEventListener(name, callback);
    }
};