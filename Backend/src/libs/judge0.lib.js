export const getJudge0LanguageId = (language) =>{
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }

    return language[language.toUppercase()]
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const pollBatchResults = async (tokens)  => {
    while(true){
         const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
            params: {
                tokens:tokens.join(","),
                base64_encoded:false
            }
         })

         const results = data.submissions

         const isAllDone = results.every(
            (r) => r.status.id !== 1 && r.status.id !== 2 
         )

         if(isAllDone)  return results
         await sleep(1000)
    }   
}

export const submitBatch = async (submissions) => {
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
    })

    console.log("Subbmition Results: ",data);

    return data 
    
}

