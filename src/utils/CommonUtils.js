class CommonUtils {
    static isNumber1(number) {
        if (number === 1) return true;
        return false;
    }

    static convertBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }
}

export default CommonUtils;
