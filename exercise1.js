const parser = new DOMParser();

const xmlString = `
   <list>
   <student>
      <name lang="en">
         <first>Ivan</first>
         <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
   </student>
   <student>
      <name lang="ru">
         <first>Петр</first>
         <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
   </student>
   </list>
`;

const getStudentData = item => {
   if (typeof item !== "object") {
      return null;
   }

   const firstName = item.querySelector("first").textContent;
   const lastName = item.querySelector("second").textContent;
   const age = +item.querySelector("age").textContent;
   const prof = item.querySelector("prof").textContent;
   const name = item.querySelector("name");
   const lang = name.getAttribute("lang");
   const student = {
      name: firstName + " " + lastName,
      age,
      prof,
      lang
   };   
   return student;
}

const getStudentsData = xmlDOM => {
   const studentNodes = xmlDOM.querySelectorAll("student");
   const studentsData = [];
   studentNodes.forEach(student => {
      studentsData.push(getStudentData(student));
   })

   return { list: studentsData }
};

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const errorNode = xmlDOM.querySelector("parsererror");
if (errorNode) {
   console.log('Parsing failed')
} else {
   console.log(getStudentsData(xmlDOM));
}