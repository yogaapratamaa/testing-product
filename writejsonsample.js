/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const Papa = require('papaparse');
const { translationCSVDir, translationJSONDir, translation } = require('./swift.config');

const writenoExist = async () => {
    const langJson = {};
    translation.languages.forEach((lang, i) => {
        langJson[lang] = [];
        fs.readdir(`${translationJSONDir}${lang}`, (err, filenames) => {
            if (err) {
                throw err;
            }
            const jsonFilenames = filenames.filter((name) => name.includes('.json'));
            jsonFilenames.forEach(async (filename, idx) => {
                await langJson[lang].push(`${filename}`);
                if (i === (translation.languages.length - 1) && idx === (jsonFilenames.length - 1)) {
                    langJson.en.forEach((key) => {
                        const dir = `${translationJSONDir}id`;
                        if (!langJson.id.includes(key) && !fs.existsSync(`${dir}/${key}`)) {
                            fs.writeFileSync(`${dir}/${key}`, JSON.stringify({}));
                        }
                    });
                    langJson.id.forEach((key) => {
                        const dir = `${translationJSONDir}en`;
                        if (!langJson.en.includes(key) && !fs.existsSync(`${dir}/${key}`)) {
                            fs.writeFileSync(`${dir}/${key}`, JSON.stringify({}));
                        }
                    });
                }
            });
        });
    });
};

const writejson = async () => {
    fs.readdir(translationCSVDir, (err, filenames) => {
        if (err) {
            throw err;
        }
        const csvFilenames = filenames.filter((name) => name.includes('.csv'));
        csvFilenames.forEach(async (filename) => {
            const languages = {};
            const specLang = {};
            await fs.readFile(translationCSVDir + filename, 'utf-8', (error, content) => {
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
        writenoExist();
    });
};

writejson();
