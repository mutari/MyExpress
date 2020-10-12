class test {

    DoStuf() {
        console.log("stuff");
    }

}

class test2 extends test {

    WriteStuf() {
        console.log("write")
    }

}

let t = new test2;
let t2 = {}
console.log(t)