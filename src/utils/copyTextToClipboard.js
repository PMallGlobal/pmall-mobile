export const copyToClipboard = (text, callback) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            if (callback) callback(`${text} copied!`, "success");
        })
        .catch(err => {
            if (callback) callback("Failed to copy!", "error");
        });
};

