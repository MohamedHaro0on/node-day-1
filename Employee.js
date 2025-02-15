class Employee {
  // this is the Constructor :
  constructor(name, age, yearsOfExperience, email, salary, level, id) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.salary = salary;
    this.level = level;
    this.yearsOfExperience = yearsOfExperience;
    this._id = id;
  }

  // Start the Getter Functions :
  get name() {
    return this._name;
  }
  get age() {
    return this._age;
  }

  get email() {
    return this._email;
  }

  get salary() {
    return this._salary;
  }

  get level() {
    return this._level;
  }

  get yearsOfExperience() {
    return this._yearsOfExperience;
  }
  get id() {
    return this._id;
  }
  // Start the Setter Function :
  set name(name) {
    const nameSchema = /^[A-Za-z]+$/;
    if (nameSchema.test(name)) {
      this._name = name;
    } else {
      throw "Employee name is Invalid";
    }
  }

  set age(value) {
    if (/^\d+$/.test(value) && value > 0) {
      this._age = value;
    } else {
      throw new Error("Invalid age");
    }
  }
  set salary(salary) {
    const salarySchema = /^\$?\d{1,3}(,\d{3})*(\.\d{1,2})?$/;
    if (salarySchema.test(salary)) {
      this._salary = salary;
    } else {
      throw "Salary Is not Valid";
    }
  }
  set email(email) {
    const emailSchema = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailSchema.test(email)) {
      this._email = email;
    } else {
      throw "Email is not Valid";
    }
  }
  set level(level) {
    if (level === null) {
      level = "Jr";
    }
    const levels = ["Jr", "Mid-level", "Sr", "Lead"];
    if (levels.includes(level)) {
      this._level = level;
    } else {
      throw "level is not Valid";
    }
  }
  set yearsOfExperience(yearsOfExperience) {
    const YearsOfExperienceSchema = /^\d{1,2}$/;
    if (YearsOfExperienceSchema.test(yearsOfExperience)) {
      this._yearsOfExperience = yearsOfExperience;
    } else {
      throw "level of Experience is not Valid";
    }
  }
}

export default Employee;
