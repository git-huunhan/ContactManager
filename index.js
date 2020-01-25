/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */

var readlineSync = require('readline-sync');
var fs = require('fs');
var fileLocation = './data.json';
var contacts = [];


function loadData() {
    var fileContent = fs.readFileSync(fileLocation);
    contacts = JSON.parse(fileContent);
}

function showMenu(){
  console.log('1. Add new contact');
  console.log('2. Edit contact');
  console.log('3. Remove contact');
  console.log('4. Search contact');
  console.log('5. Exit');

  var option = readlineSync.question('> ');
  switch (option) {
    case '1':
        createNewContact();
        showMenu();
        break;
    case '2':
        editContact();
        showMenu();
        break;
    case '3':
        deleteContact();
        showMenu();
        break;
    case '4':
        findContact();
        showMenu();
        break;
    case '5':
        break;
    default:
        console.log('Error!');
        showMenu();
        break;
  }
}

function createNewContact(){
    var name = readlineSync.question('Name: ');
    var phone = readlineSync.question('Phone: ');
    var contact = {
        name: name,
        phone: parseInt(phone)
    };
    contacts.push(contact);

    var content = JSON.stringify(contacts);
    fs.writeFileSync(fileLocation, content, {encoding: 'utf8'});
}

function editContact(){
    console.log('List contact:');
    showContact();
    var name = readlineSync.question('Enter a name: ');
    var newName = readlineSync.question('Enter new name: ');
    for (contact of contacts){
        if(contact.name.toUpperCase() === name.toUpperCase()){
                contact.name = newName;
        }
    }
    fs.writeFileSync(fileLocation, JSON.stringify(contacts));
    console.log('New list contact');
    showContact();
}

function deleteContact(){
    console.log('List contact:')
    showContact();
    var name = readlineSync.question('Enter a name: ');
    var index = 0;
    for (contact of contacts){
        if(contact.name.toUpperCase() === name.toUpperCase()){
            contacts.splice(index,1);
        }
        index++;
    }
    fs.writeFileSync(fileLocation, JSON.stringify(contacts));
    console.log('New list contact:')
    showContact();
}

function findContact(){
    var name = readlineSync.question('Enter a name: ');
    var result = contacts.find(function(contact){
    return contact.name.toUpperCase().indexOf(name.toUpperCase()) >-1;
    });
    console.log(result.name,result.phone);
}

function showContact(){
    for (var contact of contacts){
        console.log(contact.name, contact.phone);
    }
}
function main(){
    loadData();
    showMenu();
}

main();