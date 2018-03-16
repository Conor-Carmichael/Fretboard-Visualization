class LinkedList{

    constructor(length, head, tail){
        this. length = 0;
        this.head = null;
        this.tail = null;
    }

    showList(){
        var curr = this.head;
        while (curr!==null){
            curr=curr.getNext();
        }
    }

    add(node) {
        if(this.length===0){
            this.head=node;
            this.tail=node;
            this.length++;
        }
        else{
            this.tail.setNext(node);
            this.tail = node;
        }
        this.length++;
    }

    removeHead(){
        if(this.length===0){
            return null;
        }
        else{
            var temp = this.head;
            this.head = temp.next;
            temp.next=null;
            this.length--;
            return temp;
        }
        
    }

    length(){
        return this.length;
    }

}