const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: "Email",
            demandOption: false,
            type: 'string',
        },
        phone: {
            describe: "Nomor Telepon",
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.phone);
    }
})
// untuk menampilkan warning di konsol jika hanya menuliskan node app
.demandCommand();

yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & nomor telepon kontak',
    handler() {
        contacts.listContact();
    }
});

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
});

// menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    }
});


yargs.parse();
