export class AdvancedProductDetails
{
id: number;
pic: string;
header: string;
paragraph: string;
pic1: string;
header1: string;
paragraph1: string;
pic2: string;
header2: string;
paragraph2: string;
price: number;

constructor(id: number, pic: string, header: string, paragraph: string, pic1: string, header1: string, paragraph1: string, pic2: string, header2: string, paragraph2: string, price: number)
{
this.id = id;
this.pic = pic;
this.header = header;
this.paragraph = paragraph;
this.pic1 = pic1;
this.header1 = header1;
this.paragraph1 = paragraph1;
this.pic2 = pic2;
this.header2 = header2;
this.paragraph2 = paragraph2;
this.price = price;
}
}
