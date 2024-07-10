export class Message {
    constructor(public text: string, public user: string, public status: string) {}
  
    isEmpty(): boolean {
      return this.text === '';
    }
  }
  