// showNotes();
// let display = new bookDisplay();
// display.addBook();
addBook();
class bookIssue{
    constructor(bookName,bookAuthor,type){
        this.bookName=bookName;
        this.bookAuthor=bookAuthor;
        this.type=type;
    }
}
// class bookDisplay{
    function addBook(){
        let bookstore = localStorage.getItem('bookstore');
        console.log(bookstore);
        if(bookstore==null){
            let bookstoreObj=[];
        }else{
            bookstoreObj=JSON.parse(bookstore);
        }
        let uiString='';
        bookstoreObj.forEach(function(element,index) {
        // let tableBody=document.getElementById('tableBody');
         uiString += `<tr class="tr">
                        <td>${element.bookName}</td>
                        <td>${element.bookAuthor}</td>
                        <td>${element.type}</td>
                        <td><button id="${index}"onclick="deleteBook(this.id)" class="btn btn-primary">Return book</button></td>
                    </tr>`;
        // tableBody.innerHTML += uiString;

        });
        let tableBody=document.getElementById('tableBody');
        if(bookstoreObj.length !=0){
            tableBody.innerHTML = uiString;

        }else{
            tableBody.innerHTML = `<h3>you did not issued any book yet.</h3>`;
            // tableBody.style.textAlign="center";
            // tableBody.style.paddingTop="29px";

        }
    
        

    }
class bookDisplay{
    
    clear(){
        let libraryForm=document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book){
        if(book.bookName.length<2||book.bookAuthor.length<2){
            return false;
        }
        else{
            return true;
        }
    }
    show(type,displayMessage){
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

let submitForm=document.getElementById('libraryForm');
// let display=new bookDisplay();
submitForm.addEventListener('submit',submitFormbook);
function submitFormbook(e){
    e.preventDefault();
 let bookName=document.getElementById('bookName').value;
 console.log(bookName);
 let bookAuthor=document.getElementById('author').value;
 let type;
    let fiction=document.getElementById('fiction');
    let ComputerProgramming=document.getElementById('programming');
    let electronics=document.getElementById('electronics');
    if(fiction.checked){
        type=fiction.value;
    }
    else if(ComputerProgramming.checked){
        type=ComputerProgramming.value;
    }
    else if(electronics.checked){
        type=electronics.value;
    }
    let bookstore = localStorage.getItem("bookstore");
    if(bookstore==null){
       let  bookstoreObj=[];
    }
    else{
        bookstoreObj=JSON.parse(bookstore);
    }

    let book =new bookIssue(bookName,bookAuthor,type);
    console.log(book);
    let display= new bookDisplay();
    if(display.validate(book)){
        bookstoreObj.push(book);
        localStorage.setItem("bookstore",JSON.stringify(bookstoreObj));
        addBook();
        display.clear();
        display.show('success', 'Your book has been successfully added');
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }


}
function deleteBook(index){
    let bookstore= localStorage.getItem('bookstore');
    if(bookstore==null){
        let bookstoreObj=[];
    }else{
        bookstoreObj=JSON.parse(bookstore);
    }
    bookstoreObj.splice(index,1);
    localStorage.setItem("bookstore",JSON.stringify(bookstoreObj));
    // let show= new bookDisplay()
    addBook();

    
}
let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    let tr=document.getElementsByClassName('tr');
    Array.from(tr).forEach(function(element){
        let cardTxt = element.getElementsByTagName("td")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})