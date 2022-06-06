export const second2Minute = (sec) => {
    // 👇️ get number of full minutes
    const minutes = Math.floor(sec / 60);

    // 👇️ get remainder of seconds
    const seconds = sec % 60;

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    // ✅ format as MM:SS
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    return result
}