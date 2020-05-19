import moment from 'moment'

export const calcDiffHours = untillDateTime => {
    const fromDate = moment();
    const diff = moment(untillDateTime, 'YYYY-MM-DD hh:mm').diff(fromDate);

    return Math.floor(diff / 1000 / 60 / 60)
}


export const postData = async (url = '', data = {}) => {
    const res = await fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    if (!res.ok) {
        const errMessage = `Error received ${res.status}`;
        throw new Error(errMessage);
    }
    return await res.json();
}
