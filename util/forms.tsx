interface SubmitFormInfo {
    url: string;
    fetchInit: any;
    onStart?: () => void;
    onSuccess?: () => void;
    onFailure?: (error: any) => void;
    onFinish?: () => void;
}

export const trySubmitJsonFormAsync = async ({url, fetchInit,
                                                 onStart = () => {}, onSuccess = () => {},
                                                 onFailure = () => {}, onFinish = () => {}}: SubmitFormInfo) => {
    onStart();
    try {
        const res = await fetch(url, fetchInit);
        if (!res.ok) {
            const errorMessage = await res.text();
            throw Error(errorMessage);
        }
        onSuccess();
    } catch(e) {
        onFailure(e);
        console.log(`Something went wrong: ${e}`)
    }
    onFinish();
};