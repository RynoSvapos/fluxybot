const readline = require('readline');
const {
    stdin: input,
    stdout: output
} = require('process');


function askQuestion(rl, question) {

    return new Promise(resolve => {

        rl.question(question, (answer) => {
            resolve(answer);
        });

    });

}


function makeUserQuestions(domande) {



    return new Promise(async (resolve) => {

        const rl = readline.createInterface({
            input,
            output
        });

        let risposte = [];

        for (let i = 0; i < domande.length; i++) {
            const domanda = domande[i];

            const result = await askQuestion(rl, domanda + ' ');
            risposte.push(result);
        }

        rl.close();
        resolve(risposte);

    });

}


module.exports = {

    makeUserQuestions
}