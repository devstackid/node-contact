// core modules
// file system
const fs = require("fs");
// const readline = require('readline');
const chalk = require('chalk');
const validator = require('validator');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// membuat folder data
const dirPath = './data';
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
};

// membuat file contacts.json jika tidak ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)){
    fs.mkdirSync('./data/contacts.json', '[]', 'utf-8');
};

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve,reject) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama);
//         });
//     });
// };

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama,email,phone) => {
    const contact = {nama,email,phone};
    // const file = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(file);

    const contacts = loadContact();

    // Cek duplikasi agar data unik
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain"));
        return false;
    }

    // cek email apakah valid menggunakan modul validator
    if(email){
        if(!validator.isEmail(email)){
            console.log(
                chalk.red.inverse.bold('Email tidak valid!')
            )
            return false;
        }
    }

    // cek nomor telepon apakah sama
    if(!validator.isMobilePhone(phone, 'id-ID')){
        console.log(
            chalk.red.inverse.bold('Nomor telepon tidak valid!')
        )
        return false;
    }


    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold(`Terimakasih telah memasukkan data`));
};


const listContact = () => {
    const contact = loadContact();
    console.log(chalk.cyan.inverse.bold(`Daftar kontak : `));
    contact.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.phone}`);
    });
}


const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if(!contact) {
        console.log(
            chalk.red.inverse.bold(`${nama} tidak ditemukan!`)
        )
        return false;
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.phone);
    if(contact.email){
        console.log(contact.email);
    }
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() != nama.toLowerCase());

    if(contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`Data kontak ${nama} berhasil dihapus`));

}

module.exports = {simpanContact, listContact, detailContact, deleteContact};