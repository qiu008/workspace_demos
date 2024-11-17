/*Automatic Reference Counting*/

import Foundation

/*
 两个关键字：weak，unowned
 三种情况：
 两个都可nil，weak，<
 一个可nil，unowned，>=
 两个都不可nil，unowned + class!，
 */

class Apartment {

    weak var tnt: Tenant?
    
    deinit {
        print("Apartment.deinit")
    }
}
//以房东的角度，公寓一直在，可能无租客
class Tenant {

    var aptmt: Apartment? {
        didSet {
            aptmt?.tnt = self
        }
    }
    
    deinit {
        print("Tenant.deinit")
    }
}
var aptmt: Apartment? = Apartment()

var tnt: Tenant? = Tenant()
tnt?.aptmt = aptmt
//print(aptmt?.tnt ?? "nil")

//tnt = nil
//print(aptmt?.tnt ?? "nil")

//aptmt = nil


class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
    deinit { print("\(name) is being deinitialized") }
}

class CreditCard {
    let number: UInt
    unowned let customer: Customer
    init(number: UInt, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { print("Card #\(number) is being deinitialized") }
}

let john = Customer(name: "John Appleseed")
let card = CreditCard(number: 1234_5678_9012_3456, customer: john)
john.card = card


//大学里的某个系
class Department {
    var name: String
    var courses: [Course]
    init(name: String) {
        self.name = name
        self.courses = []
    }
}
//某门课
class Course {
    var name: String
    unowned var department: Department
    unowned var nextCourse: Course?
    init(name: String, in department: Department) {
        self.name = name
        self.department = department
        self.nextCourse = nil
    }
    deinit {
        print("Course.deinit")
    }
}
let department = Department(name: "Horticulture")

let intro = Course(name: "Survey of Plants", in: department)
let intermediate = Course(name: "Growing Common Herbs", in: department)
let advanced = Course(name: "Caring for Tropical Plants", in: department)

intro.nextCourse = intermediate
intermediate.nextCourse = advanced
department.courses += [intro, intermediate, advanced]
//department.courses.removeLast()


class Country {
    let name: String
    var capital: City!
    init(name: String, capitalName: String) {
        self.name = name
        self.capital = City(name: capitalName, country: self)
    }
}
let country = Country(name: "Canada", capitalName: "Ottawa")
country.capital.name
class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
//        country.capital.name
        self.name = name
        self.country = country
    }
}


class HTMLElement {

    let name: String
    let text: String?

    lazy var asHTML: () -> String = { [weak self] in
        guard let `self` = self else { return "" }
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit {
        print("\(name) is being deinitialized")
    }

}
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
print(paragraph!.asHTML())
// Prints "<p>hello, world</p>"
//paragraph?.asHTML = { () -> String in
//    return ""
//}
paragraph = nil

class SimpleClass {
    var value: Int = 0
}
var x = SimpleClass()
var y = SimpleClass()
var ii = 0
let closure = { [x, ii] in
    // 10 10 0
    print(x.value, y.value, ii)
}
//let closure = {
      // 10 10 10
//    print(x.value, y.value, ii)
//}
x.value = 10
y.value = 10
ii = 10
closure()
// Prints "10 10"
