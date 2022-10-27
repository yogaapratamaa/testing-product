/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const Papa = require('papaparse');
const { translationCSVDir, translationJSONDir } = require('./swift.config');

fs.readdir(translationCSVDir, (err, filenames) => {
    if (err) {
        throw err;
    }
    const csvFilenames = filenames.filter((name) => name.includes('.csv'));
    csvFilenames.forEach((filename) => {
        const languages = {};
        const specLang = {};
        fs.readFile(translationCSVDir + filename, 'utf-8', (error, content) => {
            if (error) {
                throw error;
            }
            const csvData = content.toString();
            const { data, meta } = Papa.parse(csvData, { header: true });
            const [key, text, module] = meta.fields;
            for (const line of data) {
                if (line[module]) {
                    specLang[line[module]] = Object.fromEntries([[line.key.replace(/ /g, '_'), line.text]]);
                } else {
                    languages[line[key].replace(/[.,/#!?$%^&*;:{}=\-`~()]/g, '')
                        .replace(/ /g, '_')] = line[text];
                }
            }
            const dir = `${translationJSONDir}${filename.replace('.csv', '')}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            const json = JSON.stringify(languages);
            fs.writeFileSync(`${dir}/common.json`, json);
            for (const keyLang in specLang) {
                if (keyLang) {
                    const jsonSpec = JSON.stringify(specLang[keyLang]);
                    fs.writeFileSync(`${dir}/${keyLang}.json`, jsonSpec);
                }
            }
        });
    });
});
