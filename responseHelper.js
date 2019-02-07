const CODE_SUCCESS = 1;
const CODE_ERROR = 0;

module.exports = {
    jsonHeader:(res)=>res.setHeader('Content-Type',"application/json"),
    successResponse:(result,res)=>res.send(
        JSON.stringify(
            {
                code: CODE_SUCCESS,
                msg: 'Success',
                result
            }
        )
    )
}