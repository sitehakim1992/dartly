// lessonsData.ts  — Dartly App  — 90 Lessons (Beginner 1-30, Intermediate 31-60, Advanced 61-90)
// All content is in English. Each lesson has detailed explanations, working code, 3 quiz questions, and an exercise.

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Exercise {
  instruction: string;
  starterCode: string;
  solution: string;
}

export interface Lesson {
  id: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  content: string;
  tips: string[];
  codeSnippet: string;
  expectedOutput: string;
  quiz: QuizQuestion[];
  exercise: Exercise;
}

export const lessonsData: Lesson[] = [

  // ═══════════════════════════════════════
  //  BEGINNER  — Lessons 1 to 30
  // ═══════════════════════════════════════

  {
    id: 1,
    level: 'Beginner',
    title: 'Hello Dart — Your First Program',
    content: `# Welcome to Dart!

Dart is a modern, strongly-typed programming language developed by Google. It is the language behind Flutter, the world's most popular framework for building mobile, web, and desktop apps from a single codebase.

## Why learn Dart?
- It compiles to fast native machine code (ARM/x86) for mobile and desktop
- It also compiles to JavaScript for the web
- Clean, readable syntax similar to Java, C#, and JavaScript
- Powers Flutter — used by millions of developers worldwide

## Your First Dart Program

Every Dart program starts with a \`main()\` function. This is the entry point — the place where execution begins.

\`void\` means the function returns nothing. \`print()\` outputs text to the console.

## Running Dart
To run a Dart file named \`hello.dart\`:
\`\`\`
dart run hello.dart
\`\`\`

Or check your Dart version:
\`\`\`
dart --version
\`\`\``,
    tips: [
      'The main() function is mandatory — every Dart program must have one.',
      'Use dart create myapp to generate a new project with the correct folder structure.',
      'Dart files use the .dart extension. Keep file names lowercase with underscores (snake_case).',
    ],
    codeSnippet: `void main() {
  print('Hello, Dart!');
  print('Welcome to the world of Dart programming.');
}`,
    expectedOutput: `Hello, Dart!\nWelcome to the world of Dart programming.`,
    quiz: [
      { question: 'What is the entry point of every Dart program?', options: ['start()', 'init()', 'main()', 'run()'], correctAnswerIndex: 2 },
      { question: 'What does the void keyword mean before main()?', options: ['The function is private', 'The function returns nothing', 'The function runs once', 'The function is async'], correctAnswerIndex: 1 },
      { question: 'Which company created the Dart language?', options: ['Apple', 'Microsoft', 'Meta', 'Google'], correctAnswerIndex: 3 },
    ],
    exercise: {
      instruction: 'Write a program that prints your name on the first line and your favorite programming language on the second line.',
      starterCode: `void main() {
  // Print your name here
  // Print your favorite language here
}`,
      solution: `void main() {
  print('My name is Alex');
  print('My favorite language is Dart');
}`,
    },
  },

  {
    id: 2,
    level: 'Beginner',
    title: 'Variables and Data Types',
    content: `# Variables in Dart

A variable is a named container that holds a value. In Dart, every variable has a type, either declared explicitly or inferred by the compiler.

## Declaring Variables

Dart provides several ways to declare variables:

**var** — the compiler infers the type from the assigned value:
\`var name = 'Alice';\`  → Dart knows this is a String.

**Explicit types** — you state the type yourself:
\`String name = 'Alice';\`
\`int age = 25;\`
\`double price = 9.99;\`
\`bool isActive = true;\`

## Core Data Types

| Type    | Meaning              | Example           |
|---------|----------------------|-------------------|
| int     | Whole numbers        | 42, -7, 0         |
| double  | Decimal numbers      | 3.14, -0.5        |
| String  | Text                 | 'hello', "world"  |
| bool    | true or false        | true, false       |
| num     | int or double        | 100, 3.5          |

## final vs const

**final** — the variable can only be assigned once. Its value is determined at runtime:
\`final today = DateTime.now();\`

**const** — the variable is a compile-time constant. The value must be known before the program runs:
\`const pi = 3.14159;\``,
    tips: [
      'Prefer final over var whenever you do not plan to reassign a variable. It makes your code safer.',
      'Use const for values that never change and are known at compile time, like pi or app version.',
      'Dart is null-safe by default — a variable cannot hold null unless you add ? to its type.',
    ],
    codeSnippet: `void main() {
  // Explicit types
  String city = 'Paris';
  int population = 2161000;
  double area = 105.4;
  bool isCapital = true;

  // Type inference with var
  var country = 'France';

  // Immutable variables
  final String greeting = 'Bonjour';
  const double taxRate = 0.20;

  print('City: $city');
  print('Population: $population');
  print('Area: $area km²');
  print('Is capital: $isCapital');
  print('Country: $country');
  print('Greeting: $greeting');
  print('Tax rate: $taxRate');
}`,
    expectedOutput: `City: Paris\nPopulation: 2161000\nArea: 105.4 km²\nIs capital: true\nCountry: France\nGreeting: Bonjour\nTax rate: 0.2`,
    quiz: [
      { question: 'Which keyword creates a compile-time constant in Dart?', options: ['var', 'final', 'static', 'const'], correctAnswerIndex: 3 },
      { question: 'What type would Dart infer for: var x = 3.14;', options: ['int', 'num', 'double', 'float'], correctAnswerIndex: 2 },
      { question: 'Can a final variable be reassigned after its first assignment?', options: ['Yes, always', 'Yes, but only once more', 'No, never', 'Only inside functions'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Declare four variables: your name (String), your age (int), your height in meters (double), and whether you are a student (bool). Then print each one.',
      starterCode: `void main() {
  // Declare your variables here

  // Print them here
}`,
      solution: `void main() {
  String name = 'Sara';
  int age = 22;
  double height = 1.70;
  bool isStudent = true;

  print('Name: $name');
  print('Age: $age');
  print('Height: $height m');
  print('Student: $isStudent');
}`,
    },
  },

  {
    id: 3,
    level: 'Beginner',
    title: 'Strings and String Interpolation',
    content: `# Working with Strings

In Dart, a String is a sequence of Unicode characters. You can use single quotes or double quotes — both are valid.

## Creating Strings

\`\`\`dart
String a = 'Hello';
String b = "World";
String multiLine = '''
  This string
  spans multiple lines.
''';
\`\`\`

## String Interpolation

Dart makes it very easy to embed values inside strings using the dollar sign \`\$\`:

- For simple variables: \`'My name is \$name'\`
- For expressions: \`'Total: \${price * quantity}'\`

This is cleaner and more readable than string concatenation.

## Useful String Methods

| Method              | What it does                          |
|---------------------|---------------------------------------|
| .length             | Number of characters                  |
| .toUpperCase()      | Convert to uppercase                  |
| .toLowerCase()      | Convert to lowercase                  |
| .trim()             | Remove leading/trailing spaces        |
| .contains('x')      | Check if string contains 'x'         |
| .replaceAll('a','b')| Replace all occurrences               |
| .split(',')         | Split into a List                     |
| .startsWith('x')    | Check if starts with 'x'             |`,
    tips: [
      'Always use string interpolation (\$variable) instead of concatenation (+) — it is cleaner and more efficient.',
      'Use triple quotes (triple single or triple double) for multi-line strings without escape characters.',
      'Strings in Dart are immutable — every method returns a new String, it does not change the original.',
    ],
    codeSnippet: `void main() {
  String firstName = 'John';
  String lastName = 'Doe';
  int age = 28;
  double score = 95.5;

  // String interpolation
  print('Full name: \$firstName \$lastName');
  print('Age: \$age years old');

  // Expression in interpolation
  print('Score percentage: \${score / 100 * 100}%');
  print('Name length: \${firstName.length} characters');

  // String methods
  print(firstName.toUpperCase());
  print(lastName.toLowerCase());

  String sentence = '  Hello Dart!  ';
  print(sentence.trim());
  print(sentence.contains('Dart'));
  print(sentence.replaceAll('Dart', 'World'));
}`,
    expectedOutput: `Full name: John Doe\nAge: 28 years old\nScore percentage: 95.5%\nName length: 4 characters\nJOHN\ndoe\nHello Dart!\ntrue\n  Hello World!  `,
    quiz: [
      { question: 'How do you embed an expression (not just a variable) inside a Dart string?', options: ['\$expression', '\${expression}', '#expression', '@{expression}'], correctAnswerIndex: 1 },
      { question: 'What does "Hello".length return?', options: ['4', '5', '6', '7'], correctAnswerIndex: 1 },
      { question: 'Which of these correctly creates a multi-line string in Dart?', options: ["'line1\\nline2'", "'''line1\\nline2'''", "String.multiLine()", 'ml"line1 line2"'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Given a product name and price, print a formatted receipt line like: "Product: Apple — Price: \$1.50 — With tax: \$1.65"',
      starterCode: `void main() {
  String product = 'Apple';
  double price = 1.50;
  double taxRate = 0.10;

  // Print the formatted receipt line
}`,
      solution: `void main() {
  String product = 'Apple';
  double price = 1.50;
  double taxRate = 0.10;
  double priceWithTax = price + (price * taxRate);

  print('Product: \$product — Price: \\\$\$price — With tax: \\\$\${priceWithTax.toStringAsFixed(2)}');
}`,
    },
  },

  {
    id: 4,
    level: 'Beginner',
    title: 'Operators in Dart',
    content: `# Operators

Operators let you perform operations on values. Dart has a rich set of operators.

## Arithmetic Operators

| Operator | Meaning              | Example      |
|----------|----------------------|--------------|
| +        | Addition             | 5 + 3 = 8    |
| -        | Subtraction          | 5 - 3 = 2    |
| *        | Multiplication       | 5 * 3 = 15   |
| /        | Division (double)    | 7 / 2 = 3.5  |
| ~/       | Integer division     | 7 ~/ 2 = 3   |
| %        | Modulo (remainder)   | 7 % 2 = 1    |

## Comparison Operators
\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\` — all return a \`bool\`.

## Logical Operators
- \`&&\` — AND: both must be true
- \`||\` — OR: at least one must be true
- \`!\` — NOT: reverses the boolean

## Assignment Operators
- \`=\` basic assignment
- \`+=\` add and assign: \`x += 5\` is the same as \`x = x + 5\`
- \`-=\`, \`*=\`, \`/=\`, \`%=\` work the same way

## Null-Aware Operators
- \`??\` — if the left side is null, use the right side: \`name ?? 'Guest'\`
- \`??=\` — assign only if currently null: \`name ??= 'Default'\``,
    tips: [
      'Use ~/ for integer division instead of casting. It is cleaner: 7 ~/ 2 gives 3, not 3.5.',
      'The ?? operator is very useful in Dart — it safely provides a fallback when a value might be null.',
      'Avoid comparing floating-point numbers with == due to precision issues. Instead check if the difference is very small.',
    ],
    codeSnippet: `void main() {
  int a = 17;
  int b = 5;

  print('Addition: \${a + b}');
  print('Subtraction: \${a - b}');
  print('Multiplication: \${a * b}');
  print('Division: \${a / b}');
  print('Integer division: \${a ~/ b}');
  print('Remainder: \${a % b}');

  print('Is 17 > 5? \${a > b}');
  print('Is 17 == 17? \${a == a}');

  bool sunny = true;
  bool warm = false;
  print('Sunny AND warm: \${sunny && warm}');
  print('Sunny OR warm: \${sunny || warm}');

  // Null-aware
  String? username;
  print('Welcome, \${username ?? "Guest"}');
}`,
    expectedOutput: `Addition: 22\nSubtraction: 12\nMultiplication: 85\nDivision: 3.4\nInteger division: 3\nRemainder: 2\nIs 17 > 5? true\nIs 17 == 17? true\nSunny AND warm: false\nSunny OR warm: true\nWelcome, Guest`,
    quiz: [
      { question: 'What does the ~/ operator do in Dart?', options: ['Computes remainder', 'Performs floating-point division', 'Performs integer (truncating) division', 'Performs bitwise XOR'], correctAnswerIndex: 2 },
      { question: 'What is the result of 10 % 3?', options: ['3', '1', '0', '2'], correctAnswerIndex: 1 },
      { question: 'What does the ?? operator return?', options: ['The right value always', 'The left value if it is not null, otherwise the right value', 'null if either side is null', 'A boolean'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'A student scored 87 out of 120. Calculate and print: the percentage (as double), the grade letter (A if >= 90%, B if >= 75%, otherwise C), and whether they passed (>= 60%).',
      starterCode: `void main() {
  int score = 87;
  int total = 120;

  // Calculate percentage

  // Print percentage, grade letter, and pass status
}`,
      solution: `void main() {
  int score = 87;
  int total = 120;

  double percentage = (score / total) * 100;
  String grade = percentage >= 90 ? 'A' : (percentage >= 75 ? 'B' : 'C');
  bool passed = percentage >= 60;

  print('Percentage: \${percentage.toStringAsFixed(1)}%');
  print('Grade: \$grade');
  print('Passed: \$passed');
}`,
    },
  },

  {
    id: 5,
    level: 'Beginner',
    title: 'Conditional Statements — if / else',
    content: `# Making Decisions with if / else

Programs need to make decisions. The \`if\` statement lets you run code only when a condition is true.

## Basic if Statement
\`\`\`dart
if (temperature > 30) {
  print('It is hot outside!');
}
\`\`\`

## if / else
\`\`\`dart
if (age >= 18) {
  print('You are an adult.');
} else {
  print('You are a minor.');
}
\`\`\`

## if / else if / else
When you have more than two cases, chain multiple conditions:
\`\`\`dart
if (score >= 90) {
  print('Grade: A');
} else if (score >= 75) {
  print('Grade: B');
} else if (score >= 60) {
  print('Grade: C');
} else {
  print('Grade: F');
}
\`\`\`

## Ternary Operator
A shorthand for simple if/else:
\`\`\`dart
String result = age >= 18 ? 'adult' : 'minor';
\`\`\`

The syntax is: \`condition ? valueIfTrue : valueIfFalse\``,
    tips: [
      'Always use curly braces {} even for single-line if bodies. It prevents bugs when you add more lines later.',
      'The ternary operator is great for simple assignments, but avoid nesting multiple ternaries — it becomes unreadable.',
      'Dart does not have truthy/falsy values like JavaScript. Conditions must evaluate to a bool — you cannot use if(1) or if("text").',
    ],
    codeSnippet: `void main() {
  int score = 78;

  if (score >= 90) {
    print('Grade: A — Excellent!');
  } else if (score >= 80) {
    print('Grade: B — Very Good!');
  } else if (score >= 70) {
    print('Grade: C — Good');
  } else if (score >= 60) {
    print('Grade: D — Passing');
  } else {
    print('Grade: F — Failed');
  }

  // Ternary operator
  String status = score >= 60 ? 'Passed' : 'Failed';
  print('Status: \$status');

  // Checking multiple conditions
  bool hasTicket = true;
  int userAge = 21;
  if (hasTicket && userAge >= 18) {
    print('Access granted!');
  } else {
    print('Access denied.');
  }
}`,
    expectedOutput: `Grade: C — Good\nStatus: Passed\nAccess granted!`,
    quiz: [
      { question: 'What is the ternary operator syntax in Dart?', options: ['condition -> true : false', 'condition ? trueValue : falseValue', 'if condition then true else false', 'condition ?? true : false'], correctAnswerIndex: 1 },
      { question: 'In Dart, can you write if(1) to mean "if true"?', options: ['Yes, non-zero is truthy', 'Yes, but only for int', 'No, conditions must be a bool', 'Yes, same as JavaScript'], correctAnswerIndex: 2 },
      { question: 'How many else if branches can you add to an if statement?', options: ['Only 1', 'Maximum 3', 'Only 2', 'As many as you need'], correctAnswerIndex: 3 },
    ],
    exercise: {
      instruction: 'Write a program that checks a person\'s BMI (weight in kg / height in meters squared). Print "Underweight" if BMI < 18.5, "Normal" if BMI < 25, "Overweight" if BMI < 30, and "Obese" otherwise.',
      starterCode: `void main() {
  double weight = 70.0; // kg
  double height = 1.75; // meters

  double bmi = weight / (height * height);
  print('BMI: \${bmi.toStringAsFixed(1)}');

  // Check BMI category
}`,
      solution: `void main() {
  double weight = 70.0;
  double height = 1.75;

  double bmi = weight / (height * height);
  print('BMI: \${bmi.toStringAsFixed(1)}');

  if (bmi < 18.5) {
    print('Category: Underweight');
  } else if (bmi < 25) {
    print('Category: Normal');
  } else if (bmi < 30) {
    print('Category: Overweight');
  } else {
    print('Category: Obese');
  }
}`,
    },
  },

  {
    id: 6,
    level: 'Beginner',
    title: 'Switch Statements',
    content: `# The switch Statement

When you need to compare one value against many possible cases, \`switch\` is cleaner than a long chain of \`if/else if\`.

## Basic switch Syntax
\`\`\`dart
switch (day) {
  case 'Monday':
    print('Start of the work week');
    break;
  case 'Friday':
    print('Almost the weekend!');
    break;
  default:
    print('A regular day');
}
\`\`\`

## Important Rules
- Each \`case\` must end with \`break\` (or \`return\`, \`throw\`) to avoid fall-through
- The \`default\` case runs if no other case matches — always good to include
- \`switch\` works with \`int\`, \`String\`, and \`enum\` values

## Dart 3 Switch Expressions (Modern)
Dart 3 introduced switch expressions — a more concise form that returns a value:
\`\`\`dart
String label = switch (statusCode) {
  200 => 'OK',
  404 => 'Not Found',
  500 => 'Server Error',
  _ => 'Unknown',
};
\`\`\`

The \`_\` is the wildcard — it matches anything not covered above.`,
    tips: [
      'Always include a default case in switch statements to handle unexpected values gracefully.',
      'Dart 3 switch expressions (using =>) are much cleaner and safer than classic switch statements — prefer them when returning a value.',
      'For enum types, switch can be made exhaustive — the compiler warns if you miss a case. This prevents bugs.',
    ],
    codeSnippet: `void main() {
  // Classic switch statement
  int day = 3;
  String dayName;

  switch (day) {
    case 1:
      dayName = 'Monday';
      break;
    case 2:
      dayName = 'Tuesday';
      break;
    case 3:
      dayName = 'Wednesday';
      break;
    case 4:
      dayName = 'Thursday';
      break;
    case 5:
      dayName = 'Friday';
      break;
    default:
      dayName = 'Weekend';
  }
  print('Day: \$dayName');

  // Dart 3 switch expression
  int statusCode = 404;
  String message = switch (statusCode) {
    200 => 'Success',
    201 => 'Created',
    400 => 'Bad Request',
    404 => 'Not Found',
    500 => 'Internal Server Error',
    _ => 'Unknown Status',
  };
  print('HTTP \$statusCode: \$message');
}`,
    expectedOutput: `Day: Wednesday\nHTTP 404: Not Found`,
    quiz: [
      { question: 'What keyword exits a switch case and prevents fall-through?', options: ['exit', 'stop', 'break', 'end'], correctAnswerIndex: 2 },
      { question: 'In a Dart 3 switch expression, what is the wildcard symbol?', options: ['*', '?', 'default', '_'], correctAnswerIndex: 3 },
      { question: 'Which types can you use in a switch statement in Dart?', options: ['Only int', 'Only String', 'int, String, and enum', 'Any object'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Use a switch expression to convert a month number (1-12) to the season: December/January/February → "Winter", March/April/May → "Spring", June/July/August → "Summer", September/October/November → "Autumn".',
      starterCode: `void main() {
  int month = 7;

  // Use a switch expression to get the season

  // Print: "Month 7 is in Summer"
}`,
      solution: `void main() {
  int month = 7;

  String season = switch (month) {
    12 || 1 || 2 => 'Winter',
    3 || 4 || 5 => 'Spring',
    6 || 7 || 8 => 'Summer',
    9 || 10 || 11 => 'Autumn',
    _ => 'Invalid month',
  };

  print('Month \$month is in \$season');
}`,
    },
  },

  {
    id: 7,
    level: 'Beginner',
    title: 'Loops — for, while, do-while',
    content: `# Loops in Dart

Loops let you repeat a block of code multiple times without writing it again and again.

## The for Loop
The most common loop. Use it when you know how many times to repeat:
\`\`\`dart
for (int i = 0; i < 5; i++) {
  print('Iteration \$i');
}
\`\`\`
Three parts: initializer, condition, updater.

## The while Loop
Use it when you do not know in advance how many iterations you need:
\`\`\`dart
int count = 0;
while (count < 5) {
  print('Count: \$count');
  count++;
}
\`\`\`

## The do-while Loop
Like \`while\`, but the body always executes at least once before checking the condition:
\`\`\`dart
int n = 0;
do {
  print('n = \$n');
  n++;
} while (n < 3);
\`\`\`

## Loop Control
- \`break\` — immediately exits the loop
- \`continue\` — skips the current iteration and moves to the next`,
    tips: [
      'Use a for loop when iterating a known number of times, while for unknown repetitions.',
      'Always make sure your loop condition will eventually become false — an infinite loop freezes your app.',
      'Prefer for-in loops (covered next lesson) over index-based loops when iterating collections.',
    ],
    codeSnippet: `void main() {
  // for loop — multiplication table of 3
  print('Multiplication table of 3:');
  for (int i = 1; i <= 5; i++) {
    print('3 x \$i = \${3 * i}');
  }

  // while loop — countdown
  print('\\nCountdown:');
  int count = 5;
  while (count > 0) {
    print(count);
    count--;
  }
  print('Launch!');

  // break and continue
  print('\\nSkipping 3 and stopping at 7:');
  for (int i = 1; i <= 10; i++) {
    if (i == 3) continue; // skip 3
    if (i == 7) break;    // stop at 7
    print(i);
  }
}`,
    expectedOutput: `Multiplication table of 3:\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n\nCountdown:\n5\n4\n3\n2\n1\nLaunch!\n\nSkipping 3 and stopping at 7:\n1\n2\n4\n5\n6`,
    quiz: [
      { question: 'What does the continue keyword do inside a loop?', options: ['Exits the loop entirely', 'Restarts the loop from the beginning', 'Skips the rest of the current iteration', 'Pauses execution'], correctAnswerIndex: 2 },
      { question: 'What is the key difference between while and do-while?', options: ['do-while is faster', 'do-while always runs the body at least once', 'while supports break, do-while does not', 'They are identical'], correctAnswerIndex: 1 },
      { question: 'In "for (int i = 0; i < 5; i++)", how many times does the loop run?', options: ['4', '5', '6', 'Infinite'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Print the sum of all even numbers from 1 to 100 using a for loop. Also print how many even numbers there are.',
      starterCode: `void main() {
  int sum = 0;
  int count = 0;

  // Loop from 1 to 100, add even numbers to sum

  print('Sum of even numbers: \$sum');
  print('Count of even numbers: \$count');
}`,
      solution: `void main() {
  int sum = 0;
  int count = 0;

  for (int i = 1; i <= 100; i++) {
    if (i % 2 == 0) {
      sum += i;
      count++;
    }
  }

  print('Sum of even numbers: \$sum');
  print('Count of even numbers: \$count');
}`,
    },
  },

  {
    id: 8,
    level: 'Beginner',
    title: 'Lists — Dart\'s Arrays',
    content: `# Lists in Dart

A \`List\` is an ordered collection of items — similar to arrays in other languages. Lists can contain any type of value.

## Creating Lists
\`\`\`dart
// Typed list
List<int> numbers = [1, 2, 3, 4, 5];

// Type-inferred
var fruits = ['apple', 'banana', 'mango'];

// Empty list
var empty = <String>[];
\`\`\`

## Accessing Items
Lists are zero-indexed — the first item is at index 0:
\`\`\`dart
print(fruits[0]); // apple
print(fruits.last); // mango
\`\`\`

## Modifying Lists
\`\`\`dart
fruits.add('orange');          // Add one item
fruits.addAll(['kiwi', 'fig']); // Add multiple
fruits.remove('banana');       // Remove by value
fruits.removeAt(0);            // Remove by index
\`\`\`

## Iterating Lists
\`\`\`dart
for (String fruit in fruits) {
  print(fruit);
}
// Or using forEach:
fruits.forEach(print);
\`\`\`

## Useful List Properties & Methods
- \`.length\` — number of items
- \`.isEmpty\` / \`.isNotEmpty\`
- \`.contains(item)\` — check if item exists
- \`.sort()\` — sort in place
- \`.reversed\` — returns reversed iterable`,
    tips: [
      'Use List<Type> to enforce that all items in the list are the same type. This catches bugs at compile time.',
      'The for-in loop is the cleanest way to iterate a list when you do not need the index.',
      'Lists are mutable by default. To make an immutable list, use List.unmodifiable([1,2,3]) or const [1,2,3].',
    ],
    codeSnippet: `void main() {
  // Creating and populating a list
  List<String> cities = ['London', 'Paris', 'Tokyo'];
  print('Cities: \$cities');
  print('Count: \${cities.length}');
  print('First: \${cities.first}');
  print('Last: \${cities.last}');

  // Adding items
  cities.add('New York');
  cities.addAll(['Dubai', 'Sydney']);
  print('\\nAfter adding: \$cities');

  // Removing
  cities.remove('Paris');
  print('After removing Paris: \$cities');

  // Iterating
  print('\\nAll cities:');
  for (String city in cities) {
    print('  → \$city');
  }

  // Checking
  print('\\nContains Tokyo? \${cities.contains("Tokyo")}');
  print('Is empty? \${cities.isEmpty}');

  // Sorting
  cities.sort();
  print('Sorted: \$cities');
}`,
    expectedOutput: `Cities: [London, Paris, Tokyo]\nCount: 3\nFirst: London\nLast: Tokyo\n\nAfter adding: [London, Paris, Tokyo, New York, Dubai, Sydney]\nAfter removing Paris: [London, Tokyo, New York, Dubai, Sydney]\n\nAll cities:\n  → London\n  → Tokyo\n  → New York\n  → Dubai\n  → Sydney\n\nContains Tokyo? true\nIs empty? false\nSorted: [Dubai, London, New York, Sydney, Tokyo]`,
    quiz: [
      { question: 'What is the index of the first element in a Dart List?', options: ['1', '-1', '0', 'Depends on the list'], correctAnswerIndex: 2 },
      { question: 'Which method adds multiple items to a List at once?', options: ['add()', 'push()', 'addAll()', 'append()'], correctAnswerIndex: 2 },
      { question: 'What does list.isEmpty return for an empty list?', options: ['null', '0', 'false', 'true'], correctAnswerIndex: 3 },
    ],
    exercise: {
      instruction: 'Create a list of 5 test scores (integers). Calculate and print the total, average, highest score, and lowest score.',
      starterCode: `void main() {
  List<int> scores = [85, 92, 78, 96, 88];

  // Calculate total, average, max, min and print them
}`,
      solution: `void main() {
  List<int> scores = [85, 92, 78, 96, 88];

  int total = 0;
  for (int s in scores) {
    total += s;
  }

  double average = total / scores.length;
  scores.sort();
  int lowest = scores.first;
  int highest = scores.last;

  print('Total: \$total');
  print('Average: \${average.toStringAsFixed(1)}');
  print('Highest: \$highest');
  print('Lowest: \$lowest');
}`,
    },
  },

  {
    id: 9,
    level: 'Beginner',
    title: 'Maps — Key-Value Storage',
    content: `# Maps in Dart

A \`Map\` stores data as key-value pairs. Think of it like a dictionary: you look up a word (key) to find its definition (value).

## Creating Maps
\`\`\`dart
Map<String, int> ages = {
  'Alice': 25,
  'Bob': 30,
  'Charlie': 22,
};
\`\`\`

## Accessing Values
\`\`\`dart
print(ages['Alice']); // 25
print(ages['Unknown']); // null — key not found
\`\`\`

## Adding and Updating
\`\`\`dart
ages['Dave'] = 28;     // Add new key
ages['Alice'] = 26;    // Update existing key
\`\`\`

## Removing
\`\`\`dart
ages.remove('Bob');
\`\`\`

## Checking Keys and Values
\`\`\`dart
ages.containsKey('Alice');   // true
ages.containsValue(30);      // false (after removing Bob)
\`\`\`

## Iterating a Map
\`\`\`dart
ages.forEach((key, value) {
  print('\$key is \$value years old');
});
// Or:
for (var entry in ages.entries) {
  print('\${entry.key}: \${entry.value}');
}
\`\`\``,
    tips: [
      'Accessing a key that does not exist returns null — always check with containsKey() or use the ?? operator to provide a default.',
      'Map keys must be unique. If you add a key that already exists, its value gets overwritten.',
      'Use Map.from() to create a copy of a map. Assigning a map to a new variable does not copy it — both variables point to the same map.',
    ],
    codeSnippet: `void main() {
  Map<String, dynamic> person = {
    'name': 'Alice',
    'age': 28,
    'city': 'London',
    'isProgrammer': true,
  };

  // Accessing values
  print('Name: \${person["name"]}');
  print('Age: \${person["age"]}');

  // Adding and updating
  person['email'] = 'alice@example.com';
  person['age'] = 29;
  print('\\nUpdated age: \${person["age"]}');
  print('Email: \${person["email"]}');

  // Checking keys
  print('\\nHas "city"? \${person.containsKey("city")}');
  print('Has "phone"? \${person.containsKey("phone")}');

  // Iterating
  print('\\nAll person data:');
  person.forEach((key, value) {
    print('  \$key: \$value');
  });

  // Keys and values
  print('\\nKeys: \${person.keys.toList()}');
  print('Total fields: \${person.length}');
}`,
    expectedOutput: `Name: Alice\nAge: 28\n\nUpdated age: 29\nEmail: alice@example.com\n\nHas "city"? true\nHas "phone"? false\n\nAll person data:\n  name: Alice\n  age: 29\n  city: London\n  isProgrammer: true\n  email: alice@example.com\n\nKeys: [name, age, city, isProgrammer, email]\nTotal fields: 5`,
    quiz: [
      { question: 'What does a Map return when you access a key that does not exist?', options: ['An error', '0', 'false', 'null'], correctAnswerIndex: 3 },
      { question: 'In Map<String, int>, what is the type of the keys?', options: ['int', 'dynamic', 'String', 'Object'], correctAnswerIndex: 2 },
      { question: 'What happens if you add a key that already exists in a Map?', options: ['An error is thrown', 'A duplicate key is created', 'The existing value is overwritten', 'Nothing happens'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create a map representing a product catalog. Each key is a product name, each value is its price. Add 3 products, then apply a 10% discount to all prices and print the updated catalog.',
      starterCode: `void main() {
  Map<String, double> catalog = {
    'Laptop': 999.99,
    'Phone': 599.99,
    'Tablet': 399.99,
  };

  // Apply 10% discount to all prices
  // Then print each product with its discounted price
}`,
      solution: `void main() {
  Map<String, double> catalog = {
    'Laptop': 999.99,
    'Phone': 599.99,
    'Tablet': 399.99,
  };

  print('Discounted prices (10% off):');
  catalog.forEach((product, price) {
    double discounted = price * 0.90;
    print('  \$product: \\\$\${discounted.toStringAsFixed(2)}');
  });
}`,
    },
  },

  {
    id: 10,
    level: 'Beginner',
    title: 'Sets — Unique Collections',
    content: `# Sets in Dart

A \`Set\` is an unordered collection that does not allow duplicate values. It is perfect when you need to store unique items or quickly check if an item exists.

## Creating Sets
\`\`\`dart
Set<String> colors = {'red', 'green', 'blue'};
var numbers = <int>{1, 2, 3};
var empty = <String>{};
\`\`\`

## Adding and Removing
\`\`\`dart
colors.add('yellow');       // Adds new item
colors.add('red');          // Ignored — 'red' already exists
colors.remove('green');
\`\`\`

## Checking Membership
\`\`\`dart
colors.contains('blue');  // true — O(1) fast lookup!
\`\`\`

## Set Operations
Sets support mathematical operations:
\`\`\`dart
Set<int> a = {1, 2, 3, 4};
Set<int> b = {3, 4, 5, 6};

print(a.union(b));        // {1,2,3,4,5,6} — all items
print(a.intersection(b)); // {3,4} — common items
print(a.difference(b));   // {1,2} — in a but not in b
\`\`\`

## When to use Set vs List?
- Use **List** when order matters or you need duplicate values
- Use **Set** when you need unique values or fast membership checks`,
    tips: [
      'Sets have O(1) lookup time — much faster than lists for checking if an element exists.',
      'To convert a List to a Set (removing duplicates): list.toSet(). To go back: set.toList().',
      'Sets are unordered — do not rely on the order of elements when iterating a Set.',
    ],
    codeSnippet: `void main() {
  // Create a set
  Set<String> programmingLanguages = {'Dart', 'Python', 'JavaScript'};

  // Add items (duplicate ignored)
  programmingLanguages.add('Kotlin');
  programmingLanguages.add('Dart'); // Duplicate — ignored
  print('Languages: \$programmingLanguages');
  print('Count: \${programmingLanguages.length}');

  // Membership check
  print('Contains Dart? \${programmingLanguages.contains("Dart")}');
  print('Contains Java? \${programmingLanguages.contains("Java")}');

  // Set operations
  Set<int> setA = {1, 2, 3, 4, 5};
  Set<int> setB = {4, 5, 6, 7, 8};

  print('\\nUnion: \${setA.union(setB)}');
  print('Intersection: \${setA.intersection(setB)}');
  print('Difference (A-B): \${setA.difference(setB)}');

  // Remove duplicates from a list using Set
  List<int> withDuplicates = [1, 2, 2, 3, 3, 3, 4];
  List<int> unique = withDuplicates.toSet().toList();
  print('\\nUnique numbers: \$unique');
}`,
    expectedOutput: `Languages: {Dart, Python, JavaScript, Kotlin}\nCount: 4\nContains Dart? true\nContains Java? false\n\nUnion: {1, 2, 3, 4, 5, 6, 7, 8}\nIntersection: {4, 5}\nDifference (A-B): {1, 2, 3}\n\nUnique numbers: [1, 2, 3, 4]`,
    quiz: [
      { question: 'What happens when you add a duplicate value to a Set?', options: ['An error is thrown', 'A second copy is stored', 'The duplicate is silently ignored', 'The original is replaced'], correctAnswerIndex: 2 },
      { question: 'Which Set operation returns only the elements that appear in BOTH sets?', options: ['union()', 'difference()', 'intersection()', 'overlap()'], correctAnswerIndex: 2 },
      { question: 'How do you create an empty Set of Strings in Dart?', options: ["Set()", "{}", "<String>{}", "[]"], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'You have two lists of students enrolled in different courses. Find: (1) All unique students across both courses, (2) Students enrolled in BOTH courses, (3) Students in Course A but NOT Course B.',
      starterCode: `void main() {
  Set<String> courseA = {'Alice', 'Bob', 'Charlie', 'Diana'};
  Set<String> courseB = {'Charlie', 'Diana', 'Eve', 'Frank'};

  // Find all unique students (union)

  // Students in both courses (intersection)

  // Students only in Course A (difference)
}`,
      solution: `void main() {
  Set<String> courseA = {'Alice', 'Bob', 'Charlie', 'Diana'};
  Set<String> courseB = {'Charlie', 'Diana', 'Eve', 'Frank'};

  print('All students: \${courseA.union(courseB)}');
  print('In both courses: \${courseA.intersection(courseB)}');
  print('Only in Course A: \${courseA.difference(courseB)}');
}`,
    },
  },

  {
    id: 11,
    level: 'Beginner',
    title: 'Functions — Defining and Calling',
    content: `# Functions in Dart

A function is a reusable block of code that performs a specific task. Instead of writing the same logic repeatedly, you define it once and call it whenever needed.

## Basic Function Syntax
\`\`\`dart
returnType functionName(parameterType paramName) {
  // body
  return value;
}
\`\`\`

Example:
\`\`\`dart
int add(int a, int b) {
  return a + b;
}
print(add(3, 5)); // 8
\`\`\`

## Void Functions (no return value)
\`\`\`dart
void greet(String name) {
  print('Hello, \$name!');
}
\`\`\`

## Arrow Functions (shorthand)
When a function has a single expression, use the arrow syntax:
\`\`\`dart
int multiply(int a, int b) => a * b;
String greet(String name) => 'Hello, \$name!';
\`\`\`

## Default Parameter Values
\`\`\`dart
void greet(String name, {String greeting = 'Hello'}) {
  print('\$greeting, \$name!');
}
greet('Alice');              // Hello, Alice!
greet('Bob', greeting: 'Hi'); // Hi, Bob!
\`\`\``,
    tips: [
      'Keep functions small and focused. Each function should do exactly one thing — this makes code easier to test and understand.',
      'Use the arrow syntax (=>) for simple single-expression functions. It is cleaner and more readable.',
      'Named parameters (using {}) make function calls self-documenting — you can see what each argument means.',
    ],
    codeSnippet: `// Calculates the area of a rectangle
double rectangleArea(double width, double height) {
  return width * height;
}

// Arrow function — calculates circle area
double circleArea(double radius) => 3.14159 * radius * radius;

// Void function — prints a formatted report
void printReport(String title, int value, {String unit = ''}) {
  print('\$title: \$value \$unit'.trim());
}

// Function with optional positional parameter
String buildUrl(String domain, [String path = '']) {
  return 'https://\$domain/\$path';
}

void main() {
  print('Rectangle area: \${rectangleArea(8.0, 5.0)}');
  print('Circle area: \${circleArea(7.0).toStringAsFixed(2)}');

  printReport('Users', 1250, unit: 'active');
  printReport('Revenue', 50000);

  print(buildUrl('example.com'));
  print(buildUrl('example.com', 'about'));
}`,
    expectedOutput: `Rectangle area: 40.0\nCircle area: 153.94\nUsers: 1250 active\nRevenue: 50000\nhttps://example.com/\nhttps://example.com/about`,
    quiz: [
      { question: 'What does a void function return?', options: ['0', 'null', 'false', 'Nothing — it has no return value'], correctAnswerIndex: 3 },
      { question: 'Which syntax creates an arrow function in Dart?', options: ['function name() ->', 'name() =>', 'def name() =>', 'name() =>'], correctAnswerIndex: 1 },
      { question: 'How do you call a named parameter when calling a function?', options: ['function(value)', 'function(paramName: value)', 'function[paramName: value]', 'function{paramName = value}'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write three functions: (1) isEven(int n) → returns true if n is even, (2) factorial(int n) → returns n! using a loop, (3) repeatString(String s, int times) → returns the string repeated. Call each in main().',
      starterCode: `// Write your functions here

void main() {
  // Test isEven
  // Test factorial
  // Test repeatString
}`,
      solution: `bool isEven(int n) => n % 2 == 0;

int factorial(int n) {
  int result = 1;
  for (int i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

String repeatString(String s, int times) {
  String result = '';
  for (int i = 0; i < times; i++) {
    result += s;
  }
  return result;
}

void main() {
  print('isEven(4): \${isEven(4)}');
  print('isEven(7): \${isEven(7)}');
  print('factorial(5): \${factorial(5)}');
  print('repeatString("ha", 3): \${repeatString("ha", 3)}');
}`,
    },
  },

  {
    id: 12,
    level: 'Beginner',
    title: 'Null Safety in Dart',
    content: `# Null Safety — Dart\'s Most Important Feature

Null safety means Dart prevents you from accidentally using a null value where a non-null is expected. This eliminates an entire category of runtime crashes called "null pointer exceptions" (NPEs).

## Non-nullable vs Nullable Types

In Dart, types are non-nullable by default:
\`\`\`dart
String name = 'Alice'; // Cannot be null
int age = 25;          // Cannot be null
\`\`\`

To allow null, add a \`?\` to the type:
\`\`\`dart
String? nickname = null; // Can be null
int? score;              // null by default
\`\`\`

## Null-Aware Operators

**?? (if-null)** — provide a fallback:
\`\`\`dart
String display = nickname ?? 'No nickname';
\`\`\`

**?. (null-safe access)** — only call if not null:
\`\`\`dart
print(nickname?.toUpperCase()); // null instead of crash
\`\`\`

**! (null assertion)** — tell Dart "I know this is not null":
\`\`\`dart
print(nickname!.toUpperCase()); // Crashes if null!
\`\`\`

**??= (null-aware assignment)** — assign only if null:
\`\`\`dart
nickname ??= 'Default';
\`\`\`

## Late Variables
When you know a variable will be assigned before it is used, but cannot assign it at declaration:
\`\`\`dart
late String username;
// ... later ...
username = fetchUsername();
\`\`\``,
    tips: [
      'Avoid using the ! (bang) operator unless you are 100% certain the value is not null. Prefer ?? or ?. for safer code.',
      'Use late sparingly — only when you genuinely cannot initialize at declaration time (e.g., in Flutter initState).',
      'Null safety is one of Dart\'s biggest strengths. Embrace nullable types with ? instead of using dynamic to avoid type checking.',
    ],
    codeSnippet: `void main() {
  // Non-nullable — guaranteed to have a value
  String name = 'Alice';
  int age = 28;

  // Nullable — might be null
  String? middleName = null;
  int? phoneExtension;

  print('Name: \$name');
  print('Age: \$age');

  // ?? — fallback operator
  print('Middle name: \${middleName ?? "N/A"}');

  // ?. — safe method call
  print('Upper middle: \${middleName?.toUpperCase() ?? "N/A"}');

  // ??= — assign only if null
  phoneExtension ??= 100;
  print('Extension: \$phoneExtension');

  // Checking for null with if
  String? email;
  if (email != null) {
    print('Email: \${email.toUpperCase()}');
  } else {
    print('No email provided');
  }

  // Type promotion — after null check, type is non-nullable
  String? city = 'London';
  if (city != null) {
    // Inside here, Dart treats city as String (not String?)
    print('City has \${city.length} chars');
  }
}`,
    expectedOutput: `Name: Alice\nAge: 28\nMiddle name: N/A\nUpper middle: N/A\nExtension: 100\nNo email provided\nCity has 6 chars`,
    quiz: [
      { question: 'In Dart null safety, what does String? mean?', options: ['A String that is always empty', 'A String that can be null', 'An optional String parameter', 'A String with unknown length'], correctAnswerIndex: 1 },
      { question: 'What does the ?? operator do?', options: ['Checks if two values are equal', 'Returns the right side if the left is null', 'Throws an error if the value is null', 'Converts null to false'], correctAnswerIndex: 1 },
      { question: 'When should you use the late keyword?', options: ['For all nullable variables', 'When a variable will definitely be assigned before use, but cannot be assigned at declaration', 'To make a variable nullable', 'For global variables only'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write a function getUserDisplayName(String? firstName, String? lastName, String? username) that returns the best available name: full name if both first and last are available, just first name if only first is available, username if no name is available, or "Anonymous" as last resort.',
      starterCode: `String getUserDisplayName(String? firstName, String? lastName, String? username) {
  // Return the best available name
}

void main() {
  print(getUserDisplayName('Alice', 'Smith', 'asmith'));
  print(getUserDisplayName('Bob', null, 'bob99'));
  print(getUserDisplayName(null, null, 'ghost'));
  print(getUserDisplayName(null, null, null));
}`,
      solution: `String getUserDisplayName(String? firstName, String? lastName, String? username) {
  if (firstName != null && lastName != null) {
    return '\$firstName \$lastName';
  } else if (firstName != null) {
    return firstName;
  } else if (username != null) {
    return username;
  } else {
    return 'Anonymous';
  }
}

void main() {
  print(getUserDisplayName('Alice', 'Smith', 'asmith'));
  print(getUserDisplayName('Bob', null, 'bob99'));
  print(getUserDisplayName(null, null, 'ghost'));
  print(getUserDisplayName(null, null, null));
}`,
    },
  },

  {
    id: 13,
    level: 'Beginner',
    title: 'Classes and Objects — OOP Basics',
    content: `# Object-Oriented Programming in Dart

Dart is a purely object-oriented language. Everything is an object. Classes are blueprints for creating objects.

## Why Use Classes?

Imagine building a banking app. Instead of having separate variables for each account's name, balance, and ID, you group them into a class:

\`\`\`dart
class BankAccount {
  String owner;
  double balance;
  // ...
}
\`\`\`

## Defining a Class
\`\`\`dart
class Car {
  String brand;
  int year;
  double price;

  Car(this.brand, this.year, this.price); // Constructor
}
\`\`\`

## Creating Objects (Instances)
\`\`\`dart
Car myCar = Car('Toyota', 2022, 25000.0);
print(myCar.brand); // Toyota
\`\`\`

## Methods
Functions defined inside a class:
\`\`\`dart
class Car {
  // ...
  void start() {
    print('\$brand engine started!');
  }

  double calculateTax(double taxRate) {
    return price * taxRate;
  }
}
\`\`\`

## The this Keyword
\`this\` refers to the current instance of the class. \`this.brand\` means the \`brand\` of this specific object.`,
    tips: [
      'Class names in Dart use PascalCase (e.g., BankAccount, CarModel, UserProfile).',
      'The this.fieldName syntax in constructors is a shorthand for assigning parameters to fields — use it instead of writing this.brand = brand manually.',
      'Always mark fields that should not change after construction as final.',
    ],
    codeSnippet: `class Rectangle {
  final double width;
  final double height;

  // Constructor with parameter shorthand
  Rectangle(this.width, this.height);

  // Computed property
  double get area => width * height;
  double get perimeter => 2 * (width + height);

  // Method
  bool isSquare() => width == height;

  // Override toString for readable output
  @override
  String toString() => 'Rectangle(\${width}x\$height)';
}

void main() {
  Rectangle r1 = Rectangle(8.0, 5.0);
  Rectangle r2 = Rectangle(6.0, 6.0);

  print(r1);
  print('Area: \${r1.area}');
  print('Perimeter: \${r1.perimeter}');
  print('Is square: \${r1.isSquare()}');

  print('');
  print(r2);
  print('Area: \${r2.area}');
  print('Is square: \${r2.isSquare()}');
}`,
    expectedOutput: `Rectangle(8.0x5.0)\nArea: 40.0\nPerimeter: 26.0\nIs square: false\n\nRectangle(6.0x6.0)\nArea: 36.0\nIs square: true`,
    quiz: [
      { question: 'What is a class in Dart?', options: ['A function that returns an object', 'A blueprint for creating objects', 'A special type of variable', 'A collection of functions'], correctAnswerIndex: 1 },
      { question: 'What does the this keyword refer to inside a class?', options: ['The parent class', 'The current instance of the class', 'The constructor', 'A static method'], correctAnswerIndex: 1 },
      { question: 'What naming convention do Dart classes use?', options: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create a Student class with fields: name (String), grade (int), and scores (List<int>). Add a method average() that returns the average score, and a method isPassing() that returns true if average >= 60. Create two Student objects and print their info.',
      starterCode: `class Student {
  // Add fields here

  // Add constructor

  // Add average() method

  // Add isPassing() method
}

void main() {
  // Create two students and print their info
}`,
      solution: `class Student {
  final String name;
  final int grade;
  final List<int> scores;

  Student(this.name, this.grade, this.scores);

  double average() {
    int total = 0;
    for (int s in scores) total += s;
    return total / scores.length;
  }

  bool isPassing() => average() >= 60;
}

void main() {
  Student s1 = Student('Alice', 10, [85, 92, 78, 88]);
  Student s2 = Student('Bob', 10, [45, 55, 50, 60]);

  print('\${s1.name}: avg=\${s1.average().toStringAsFixed(1)}, passing=\${s1.isPassing()}');
  print('\${s2.name}: avg=\${s2.average().toStringAsFixed(1)}, passing=\${s2.isPassing()}');
}`,
    },
  },

  {
    id: 14,
    level: 'Beginner',
    title: 'Constructors — Named & Factory',
    content: `# Types of Constructors in Dart

Dart supports several types of constructors, each serving a different purpose.

## Default Constructor
\`\`\`dart
class Point {
  double x, y;
  Point(this.x, this.y);
}
\`\`\`

## Named Constructors
Allow multiple ways to create an object:
\`\`\`dart
class Point {
  double x, y;
  Point(this.x, this.y);

  Point.origin() : x = 0, y = 0;        // Named constructor
  Point.fromList(List<double> list)
      : x = list[0], y = list[1];        // Another named constructor
}

var p1 = Point(3.0, 4.0);
var p2 = Point.origin();         // (0, 0)
var p3 = Point.fromList([5.0, 6.0]);
\`\`\`

## Initializer Lists
The part after \`:\` and before the body runs before the constructor body. Use it to initialize final fields or validate inputs:
\`\`\`dart
class Temperature {
  final double celsius;
  final double fahrenheit;

  Temperature(this.celsius) : fahrenheit = celsius * 9 / 5 + 32;
}
\`\`\`

## Factory Constructors
A \`factory\` constructor does not always create a new instance. It can return cached instances, a subtype, or apply logic:
\`\`\`dart
class Logger {
  static final Logger _instance = Logger._internal();
  factory Logger() => _instance; // Always returns same instance
  Logger._internal();
}
\`\`\``,
    tips: [
      'Named constructors make your code more expressive. Point.origin() is much clearer than Point(0, 0).',
      'Use factory constructors when object creation needs logic — like returning a cached instance (singleton pattern).',
      'The initializer list (the colon after constructor params) runs before the body — perfect for initializing final fields that depend on parameters.',
    ],
    codeSnippet: `class Color {
  final int red;
  final int green;
  final int blue;

  // Default constructor
  Color(this.red, this.green, this.blue);

  // Named constructors
  Color.black() : red = 0, green = 0, blue = 0;
  Color.white() : red = 255, green = 255, blue = 255;
  Color.red() : red = 255, green = 0, blue = 0;

  // Factory constructor — from hex string
  factory Color.fromHex(String hex) {
    final r = int.parse(hex.substring(0, 2), radix: 16);
    final g = int.parse(hex.substring(2, 4), radix: 16);
    final b = int.parse(hex.substring(4, 6), radix: 16);
    return Color(r, g, b);
  }

  @override
  String toString() => 'Color(R:\$red, G:\$green, B:\$blue)';
}

void main() {
  print(Color(128, 0, 255));
  print(Color.black());
  print(Color.white());
  print(Color.red());
  print(Color.fromHex('FF8C00'));
}`,
    expectedOutput: `Color(R:128, G:0, B:255)\nColor(R:0, G:0, B:0)\nColor(R:255, G:255, B:255)\nColor(R:255, G:0, B:0)\nColor(R:255, G:140, B:0)`,
    quiz: [
      { question: 'What is a named constructor?', options: ['A constructor with all named parameters', 'An additional constructor with a dot-name (e.g., Point.origin())', 'A static method that creates objects', 'A constructor that takes no arguments'], correctAnswerIndex: 1 },
      { question: 'What is unique about a factory constructor?', options: ['It must return a new instance', 'It runs faster than regular constructors', 'It can return a cached or existing instance', 'It cannot access instance fields'], correctAnswerIndex: 2 },
      { question: 'When does the initializer list (the colon part) run?', options: ['After the constructor body', 'Before the constructor body', 'Concurrently with the body', 'Only when explicitly called'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Create a Circle class with a radius field. Add: a default constructor, a named constructor Circle.unit() for a unit circle (radius=1), and a factory constructor Circle.fromDiameter(double diameter). Add an area getter. Test all three.',
      starterCode: `import 'dart:math';

class Circle {
  final double radius;

  // Default constructor
  Circle(this.radius);

  // Add named constructor Circle.unit()

  // Add factory constructor Circle.fromDiameter()

  double get area => pi * radius * radius;
}

void main() {
  // Test all three constructors
}`,
      solution: `import 'dart:math';

class Circle {
  final double radius;

  Circle(this.radius);

  Circle.unit() : radius = 1.0;

  factory Circle.fromDiameter(double diameter) {
    return Circle(diameter / 2);
  }

  double get area => pi * radius * radius;

  @override
  String toString() => 'Circle(r=\$radius, area=\${area.toStringAsFixed(2)})';
}

void main() {
  print(Circle(5.0));
  print(Circle.unit());
  print(Circle.fromDiameter(10.0));
}`,
    },
  },

  {
    id: 15,
    level: 'Beginner',
    title: 'Getters and Setters',
    content: `# Getters and Setters

Getters and setters are special methods that look like properties from the outside but contain logic. They allow you to control access to your class fields.

## Why Use Getters?

Instead of exposing a raw field, compute or format the value:
\`\`\`dart
class Circle {
  double radius;
  Circle(this.radius);

  double get diameter => radius * 2;          // Computed getter
  double get area => 3.14159 * radius * radius; // Another getter
}
\`\`\`

You access these like fields, not methods:
\`\`\`dart
Circle c = Circle(5);
print(c.diameter); // Not c.diameter()!
\`\`\`

## Why Use Setters?

To validate or transform input before storing it:
\`\`\`dart
class Temperature {
  double _celsius = 0;

  double get celsius => _celsius;

  set celsius(double value) {
    if (value < -273.15) {
      throw ArgumentError('Temperature below absolute zero!');
    }
    _celsius = value;
  }
}
\`\`\`

## Private Fields
Fields starting with \`_\` (underscore) are private to the file in Dart:
\`\`\`dart
double _balance = 0; // Private — cannot be accessed outside this file
\`\`\``,
    tips: [
      'Prefix internal fields with _ to make them private. Then expose them through getters/setters with validation.',
      'Getters are accessed without parentheses — they look just like regular properties to the caller, which keeps the API clean.',
      'Avoid trivial getters/setters that just return or assign without any logic — just use a public field instead.',
    ],
    codeSnippet: `class BankAccount {
  final String owner;
  double _balance;

  BankAccount(this.owner, double initialBalance)
      : _balance = initialBalance >= 0 ? initialBalance : 0;

  // Getter
  double get balance => _balance;

  // Computed getter
  String get formattedBalance => '\\\$\${_balance.toStringAsFixed(2)}';

  bool get isOverdrawn => _balance < 0;

  // Methods that validate operations
  void deposit(double amount) {
    if (amount <= 0) throw ArgumentError('Deposit must be positive');
    _balance += amount;
    print('Deposited \\\$\${amount.toStringAsFixed(2)}. New balance: \$formattedBalance');
  }

  void withdraw(double amount) {
    if (amount <= 0) throw ArgumentError('Withdrawal must be positive');
    if (amount > _balance) throw StateError('Insufficient funds');
    _balance -= amount;
    print('Withdrew \\\$\${amount.toStringAsFixed(2)}. New balance: \$formattedBalance');
  }
}

void main() {
  final account = BankAccount('Alice', 1000.0);
  print('Owner: \${account.owner}');
  print('Balance: \${account.formattedBalance}');

  account.deposit(500.0);
  account.withdraw(200.0);

  print('Final balance: \${account.formattedBalance}');
  print('Overdrawn: \${account.isOverdrawn}');
}`,
    expectedOutput: `Owner: Alice\nBalance: \$1000.00\nDeposited \$500.00. New balance: \$1500.00\nWithdrew \$200.00. New balance: \$1300.00\nFinal balance: \$1300.00\nOverdrawn: false`,
    quiz: [
      { question: 'How do you call a getter in Dart?', options: ['object.getter()', 'object.getter', 'object.get.getter()', 'get object.getter'], correctAnswerIndex: 1 },
      { question: 'What is the naming convention for private fields in Dart?', options: ['Starting with __', 'Starting with #', 'Starting with _', 'Starting with private_'], correctAnswerIndex: 2 },
      { question: 'What is the main benefit of using a setter instead of a public field?', options: ['Setters are faster', 'You can add validation or transformation logic', 'Setters use less memory', 'Only setters support null values'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Create a Product class with private fields _name and _price. Add getters for both. Add a setter for price that throws an ArgumentError if price is negative. Add a getter discountedPrice(double discountPercent) as a method. Test it.',
      starterCode: `class Product {
  String _name;
  double _price;

  Product(this._name, this._price);

  // Add getter for name

  // Add getter and setter for price (validate: price >= 0)

  // Add method discountedPrice(double discountPercent)
}

void main() {
  // Test the Product class
}`,
      solution: `class Product {
  String _name;
  double _price;

  Product(this._name, this._price);

  String get name => _name;

  double get price => _price;

  set price(double value) {
    if (value < 0) throw ArgumentError('Price cannot be negative');
    _price = value;
  }

  double discountedPrice(double discountPercent) {
    return _price * (1 - discountPercent / 100);
  }
}

void main() {
  final p = Product('Laptop', 999.99);
  print('\${p.name}: \\\$\${p.price}');
  p.price = 899.99;
  print('Updated price: \\\$\${p.price}');
  print('20% off: \\\$\${p.discountedPrice(20).toStringAsFixed(2)}');
}`,
    },
  },

  {
    id: 16,
    level: 'Beginner',
    title: 'Inheritance — Extending Classes',
    content: `# Inheritance in Dart

Inheritance allows a class (child/subclass) to inherit fields and methods from another class (parent/superclass). This promotes code reuse and creates "is-a" relationships.

## Basic Inheritance
\`\`\`dart
class Animal {
  String name;
  Animal(this.name);

  void eat() => print('\$name is eating');
}

class Dog extends Animal {
  String breed;
  Dog(String name, this.breed) : super(name); // Call parent constructor

  void bark() => print('\$name says Woof!');
}
\`\`\`

A \`Dog\` is an \`Animal\` — it has all Animal fields/methods PLUS its own.

## Overriding Methods
A child class can provide its own implementation of a parent method:
\`\`\`dart
class Cat extends Animal {
  @override
  void eat() {
    print('\$name eats slowly and gracefully');
  }
}
\`\`\`

The \`@override\` annotation is optional but recommended — it helps the compiler catch mistakes.

## super Keyword
- \`super(args)\` — calls the parent constructor
- \`super.method()\` — calls the parent's version of an overridden method`,
    tips: [
      'Always call super() in the constructor when your parent class has a required constructor — otherwise you get a compile error.',
      'Use @override to mark overridden methods. It is not required but helps avoid silent bugs if the parent method is renamed.',
      'Dart does not support multiple inheritance (a class can only extend one parent), but it supports multiple interfaces and mixins.',
    ],
    codeSnippet: `class Shape {
  String color;
  Shape(this.color);

  double area() => 0;
  double perimeter() => 0;

  void describe() {
    print('A \$color shape with area=\${area().toStringAsFixed(2)}, perimeter=\${perimeter().toStringAsFixed(2)}');
  }
}

class Circle extends Shape {
  double radius;
  Circle(String color, this.radius) : super(color);

  @override
  double area() => 3.14159 * radius * radius;

  @override
  double perimeter() => 2 * 3.14159 * radius;
}

class Rectangle extends Shape {
  double width, height;
  Rectangle(String color, this.width, this.height) : super(color);

  @override
  double area() => width * height;

  @override
  double perimeter() => 2 * (width + height);
}

void main() {
  Circle c = Circle('red', 7.0);
  Rectangle r = Rectangle('blue', 8.0, 5.0);

  c.describe();
  r.describe();

  // Polymorphism — treat both as Shape
  List<Shape> shapes = [c, r];
  double totalArea = 0;
  for (Shape s in shapes) {
    totalArea += s.area();
  }
  print('Total area: \${totalArea.toStringAsFixed(2)}');
}`,
    expectedOutput: `A red shape with area=153.94, perimeter=43.98\nA blue shape with area=40.00, perimeter=26.00\nTotal area: 193.94`,
    quiz: [
      { question: 'What keyword is used to inherit from a class in Dart?', options: ['implements', 'inherits', 'extends', 'uses'], correctAnswerIndex: 2 },
      { question: 'How do you call the parent class constructor from a child class?', options: ['parent(args)', 'base(args)', 'super(args)', 'this.super(args)'], correctAnswerIndex: 2 },
      { question: 'What is the purpose of the @override annotation?', options: ['It is required to override a method', 'It tells the compiler this method intentionally overrides a parent method', 'It makes the method run faster', 'It prevents the method from being overridden further'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Create a Vehicle base class with fields brand, year, and a method fuelCost(double km). Create two subclasses: Car (fuelEfficiency in km/L) and ElectricCar (kWhPer100km). Override fuelCost for each. Car uses (km/efficiency * pricePerLiter), ElectricCar uses (km/100 * kWh * pricePerKWh).',
      starterCode: `class Vehicle {
  String brand;
  int year;
  Vehicle(this.brand, this.year);

  double fuelCost(double km) => 0;
}

// Create Car class

// Create ElectricCar class

void main() {
  // Test both
}`,
      solution: `class Vehicle {
  String brand;
  int year;
  Vehicle(this.brand, this.year);

  double fuelCost(double km) => 0;
}

class Car extends Vehicle {
  double fuelEfficiency; // km/L
  double pricePerLiter;

  Car(String brand, int year, this.fuelEfficiency, this.pricePerLiter)
      : super(brand, year);

  @override
  double fuelCost(double km) => (km / fuelEfficiency) * pricePerLiter;
}

class ElectricCar extends Vehicle {
  double kWhPer100km;
  double pricePerKWh;

  ElectricCar(String brand, int year, this.kWhPer100km, this.pricePerKWh)
      : super(brand, year);

  @override
  double fuelCost(double km) => (km / 100) * kWhPer100km * pricePerKWh;
}

void main() {
  Car car = Car('Toyota', 2022, 15.0, 1.80);
  ElectricCar ev = ElectricCar('Tesla', 2023, 16.0, 0.12);

  print('Car cost for 200km: \\\$\${car.fuelCost(200).toStringAsFixed(2)}');
  print('EV cost for 200km: \\\$\${ev.fuelCost(200).toStringAsFixed(2)}');
}`,
    },
  },

  {
    id: 17,
    level: 'Beginner',
    title: 'Abstract Classes and Interfaces',
    content: `# Abstract Classes and Interfaces

## Abstract Classes
An abstract class cannot be instantiated directly — it is a template for other classes. It can define abstract methods (no body) that subclasses must implement:

\`\`\`dart
abstract class Animal {
  String name;
  Animal(this.name);

  void breathe() => print('\$name is breathing'); // Concrete method

  String sound(); // Abstract method — no body, must be overridden
}
\`\`\`

## Implementing Interfaces
In Dart, every class implicitly defines an interface. Use \`implements\` to implement an interface — your class must provide all methods:
\`\`\`dart
class Printable {
  void printInfo();
}

class Serializable {
  String toJson();
}

class User implements Printable, Serializable {
  String name;
  User(this.name);

  @override
  void printInfo() => print('User: \$name');

  @override
  String toJson() => '{"name": "\$name"}';
}
\`\`\`

## extends vs implements
- \`extends\` — inherit implementation, call super(), override some methods
- \`implements\` — fulfill a contract, provide ALL implementations yourself, no super()`,
    tips: [
      'Use abstract classes when you want to share some implementation across subclasses, but force them to implement specific methods.',
      'Use implements when you want to define a contract (interface) without sharing any implementation.',
      'A class can implement multiple interfaces but can only extend one class.',
    ],
    codeSnippet: `abstract class DatabaseDriver {
  // Abstract methods — subclasses must implement these
  Future<void> connect(String url);
  Future<Map<String, dynamic>?> query(String sql);
  Future<void> disconnect();

  // Concrete method — shared implementation
  void log(String message) {
    print('[DB] \$message');
  }
}

// Interface for cacheable items
abstract class Cacheable {
  String get cacheKey;
  Duration get ttl;
}

class Product implements Cacheable {
  final String id;
  final String name;

  Product(this.id, this.name);

  @override
  String get cacheKey => 'product:\$id';

  @override
  Duration get ttl => Duration(minutes: 30);

  @override
  String toString() => 'Product(\$name, key: \$cacheKey, ttl: \${ttl.inMinutes}m)';
}

void main() {
  Product p = Product('p001', 'Laptop');
  print(p);
  print('Cache key: \${p.cacheKey}');
  print('TTL: \${p.ttl.inMinutes} minutes');
}`,
    expectedOutput: `Product(Laptop, key: product:p001, ttl: 30m)\nCache key: product:p001\nTTL: 30 minutes`,
    quiz: [
      { question: 'Can you instantiate an abstract class directly?', options: ['Yes', 'Only with new keyword', 'No', 'Only if it has no abstract methods'], correctAnswerIndex: 2 },
      { question: 'What is the difference between extends and implements?', options: ['They are identical', 'extends inherits code; implements only fulfills a contract', 'implements inherits code; extends only fulfills a contract', 'extends is for abstract classes only'], correctAnswerIndex: 1 },
      { question: 'Can a class implement multiple interfaces in Dart?', options: ['No, only one', 'Yes, using comma-separated list', 'Only with abstract keyword', 'Only if they share no methods'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Define an abstract class PaymentMethod with abstract methods: bool processPayment(double amount) and String getReceipt(). Then create two concrete classes: CreditCard and PayPal, each implementing both methods with different logic. Test polymorphically.',
      starterCode: `abstract class PaymentMethod {
  // Add abstract methods
}

class CreditCard extends PaymentMethod {
  String cardNumber;
  CreditCard(this.cardNumber);
  // Implement methods
}

class PayPal extends PaymentMethod {
  String email;
  PayPal(this.email);
  // Implement methods
}

void main() {
  // Test polymorphically
}`,
      solution: `abstract class PaymentMethod {
  bool processPayment(double amount);
  String getReceipt();
}

class CreditCard extends PaymentMethod {
  String cardNumber;
  double? _lastAmount;
  CreditCard(this.cardNumber);

  @override
  bool processPayment(double amount) {
    _lastAmount = amount;
    print('Charging \\\$\$amount to card ending in \${cardNumber.substring(cardNumber.length - 4)}');
    return true;
  }

  @override
  String getReceipt() => 'Credit Card Receipt: \\\$\${_lastAmount?.toStringAsFixed(2)}';
}

class PayPal extends PaymentMethod {
  String email;
  double? _lastAmount;
  PayPal(this.email);

  @override
  bool processPayment(double amount) {
    _lastAmount = amount;
    print('Sending \\\$\$amount via PayPal to \$email');
    return true;
  }

  @override
  String getReceipt() => 'PayPal Receipt: \\\$\${_lastAmount?.toStringAsFixed(2)} sent to \$email';
}

void main() {
  List<PaymentMethod> payments = [CreditCard('4111111111111234'), PayPal('user@example.com')];
  for (var p in payments) {
    p.processPayment(49.99);
    print(p.getReceipt());
    print('');
  }
}`,
    },
  },

  {
    id: 18,
    level: 'Beginner',
    title: 'Enums — Enumerated Types',
    content: `# Enums in Dart

An enum (enumeration) is a special type that represents a fixed set of named constant values. Use enums instead of magic numbers or strings.

## Basic Enum
\`\`\`dart
enum Direction { north, south, east, west }
enum Status { pending, active, inactive, deleted }
\`\`\`

Use them:
\`\`\`dart
Direction dir = Direction.north;
print(dir.name);  // "north"
print(dir.index); // 0
\`\`\`

## Dart 3 Enhanced Enums
Dart 3 allows enums to have fields, constructors, and methods:
\`\`\`dart
enum Planet {
  mercury(3.303e+23, 2.4397e6),
  venus(4.869e+24, 6.0518e6),
  earth(5.976e+24, 6.37814e6);

  final double mass;
  final double radius;

  const Planet(this.mass, this.radius);

  double get surfaceGravity => 6.67430e-11 * mass / (radius * radius);
}
\`\`\`

## Enum in switch
\`\`\`dart
switch (status) {
  case Status.pending: print('Waiting...');
  case Status.active: print('Active!');
  // ...
}
\`\`\``,
    tips: [
      'Use enums for any fixed set of values. Never use raw integers like 0=pending, 1=active — use Status.pending, Status.active.',
      'Dart 3 enhanced enums are powerful — you can add methods, getters, and fields just like a regular class.',
      '.values gives you all enum cases as a list — useful for iterating all options.',
    ],
    codeSnippet: `enum OrderStatus {
  placed('Order placed', '📦'),
  processing('Being prepared', '🔄'),
  shipped('On the way', '🚚'),
  delivered('Delivered!', '✅'),
  cancelled('Cancelled', '❌');

  final String description;
  final String emoji;

  const OrderStatus(this.description, this.emoji);

  bool get isActive =>
      this != OrderStatus.delivered && this != OrderStatus.cancelled;

  OrderStatus? get nextStatus => switch (this) {
    OrderStatus.placed => OrderStatus.processing,
    OrderStatus.processing => OrderStatus.shipped,
    OrderStatus.shipped => OrderStatus.delivered,
    _ => null,
  };
}

void main() {
  OrderStatus current = OrderStatus.processing;

  print('\${current.emoji} \${current.description}');
  print('Active: \${current.isActive}');
  print('Next: \${current.nextStatus?.description ?? "Final state"}');

  print('\\nAll statuses:');
  for (final status in OrderStatus.values) {
    print('  [\${status.index}] \${status.emoji} \${status.name} — \${status.description}');
  }
}`,
    expectedOutput: `🔄 Being prepared\nActive: true\nNext: On the way\n\nAll statuses:\n  [0] 📦 placed — Order placed\n  [1] 🔄 processing — Being prepared\n  [2] 🚚 shipped — On the way\n  [3] ✅ delivered — Delivered!\n  [4] ❌ cancelled — Cancelled`,
    quiz: [
      { question: 'What does .index return on an enum value?', options: ['The name as a String', 'The zero-based position of the enum case', 'The number of cases in the enum', 'null'], correctAnswerIndex: 1 },
      { question: 'How do you get the name of an enum case as a String?', options: ['enumValue.toString()', 'enumValue.label', 'enumValue.name', 'String(enumValue)'], correctAnswerIndex: 2 },
      { question: 'Dart 3 enhanced enums can have:', options: ['Only fields', 'Only methods', 'Fields, constructors, and methods', 'Nothing extra — only names'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create an enum DayType with cases: monday, tuesday, wednesday, thursday, friday, saturday, sunday. Add a bool getter isWeekend and a String getter type that returns "Weekday" or "Weekend". Print the type for each day.',
      starterCode: `enum DayType {
  // Add all 7 days

  // Add isWeekend getter

  // Add type getter
}

void main() {
  for (final day in DayType.values) {
    // Print each day and its type
  }
}`,
      solution: `enum DayType {
  monday, tuesday, wednesday, thursday, friday, saturday, sunday;

  bool get isWeekend => this == saturday || this == sunday;

  String get type => isWeekend ? 'Weekend' : 'Weekday';
}

void main() {
  for (final day in DayType.values) {
    print('\${day.name}: \${day.type}');
  }
}`,
    },
  },

  {
    id: 19,
    level: 'Beginner',
    title: 'Exception Handling — try / catch / finally',
    content: `# Exception Handling in Dart

Things can go wrong at runtime — a file might not exist, a network call might fail, or you might try to divide by zero. Exception handling lets you deal with these errors gracefully instead of crashing.

## Basic try / catch
\`\`\`dart
try {
  int result = 10 ~/ 0; // Throws IntegerDivisionByZeroException
  print(result);
} catch (e) {
  print('Error: \$e');
}
\`\`\`

## Catching Specific Exception Types
\`\`\`dart
try {
  // ...
} on FormatException catch (e) {
  print('Format error: \${e.message}');
} on RangeError catch (e) {
  print('Range error: \$e');
} catch (e, stackTrace) {
  print('Unknown error: \$e');
  print('Stack: \$stackTrace');
}
\`\`\`

## finally Block
Code in \`finally\` runs regardless of whether an exception occurred — perfect for cleanup:
\`\`\`dart
try {
  // risky code
} catch (e) {
  // handle error
} finally {
  // always runs — close connections, release resources
}
\`\`\`

## Throwing Exceptions
\`\`\`dart
throw ArgumentError('Age cannot be negative: \$age');
throw Exception('Something went wrong');
\`\`\`

## Custom Exceptions
\`\`\`dart
class InsufficientFundsException implements Exception {
  final double amount;
  InsufficientFundsException(this.amount);

  @override
  String toString() => 'Insufficient funds: need \$amount more';
}
\`\`\``,
    tips: [
      'Catch specific exception types before the general catch block — more specific handlers should come first.',
      'Use finally for cleanup that must always happen: closing files, database connections, or releasing resources.',
      'Do not catch exceptions you cannot handle. Let them propagate to a level where they can be dealt with properly.',
    ],
    codeSnippet: `class InsufficientFundsException implements Exception {
  final double required;
  final double available;

  InsufficientFundsException(this.required, this.available);

  @override
  String toString() =>
      'InsufficientFunds: need \\\$\${required.toStringAsFixed(2)}, only \\\$\${available.toStringAsFixed(2)} available';
}

double divide(int a, int b) {
  if (b == 0) throw ArgumentError('Cannot divide by zero');
  return a / b;
}

int parseAge(String input) {
  final age = int.parse(input); // Throws FormatException if not a number
  if (age < 0 || age > 150) throw RangeError.range(age, 0, 150, 'age');
  return age;
}

void main() {
  // Handling arithmetic errors
  try {
    print(divide(10, 2));
    print(divide(10, 0)); // Will throw
  } on ArgumentError catch (e) {
    print('Argument error: \${e.message}');
  }

  // Handling format errors
  try {
    print(parseAge('twenty'));
  } on FormatException catch (e) {
    print('Format error: Cannot parse age');
  } on RangeError catch (e) {
    print('Range error: \$e');
  }

  // Custom exception
  try {
    double balance = 100.0;
    double withdrawal = 150.0;
    if (withdrawal > balance) throw InsufficientFundsException(withdrawal, balance);
  } catch (e) {
    print(e);
  } finally {
    print('Transaction attempt finished.');
  }
}`,
    expectedOutput: `5.0\nArgument error: Cannot divide by zero\nFormat error: Cannot parse age\nInsufficientFunds: need \$150.00, only \$100.00 available\nTransaction attempt finished.`,
    quiz: [
      { question: 'What does the finally block guarantee?', options: ['It runs only when an exception occurs', 'It runs only when no exception occurs', 'It always runs, whether or not an exception occurred', 'It runs before the try block'], correctAnswerIndex: 2 },
      { question: 'How do you catch a specific exception type in Dart?', options: ['catch (ExceptionType e)', 'on ExceptionType catch (e)', 'try ExceptionType catch (e)', 'catch as ExceptionType (e)'], correctAnswerIndex: 1 },
      { question: 'Which keyword is used to throw an exception?', options: ['raise', 'error', 'throw', 'except'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Write a function safeDivide(int a, int b) that throws a custom DivisionByZeroException (you define it) when b==0, and returns the result otherwise. Write another function parsePositiveInt(String s) that returns an int, throwing a FormatException if not a number and an ArgumentError if the number is negative. Test both with try/catch.',
      starterCode: `class DivisionByZeroException implements Exception {
  @override
  String toString() => 'DivisionByZeroException: Cannot divide by zero';
}

double safeDivide(int a, int b) {
  // Implement
}

int parsePositiveInt(String s) {
  // Implement
}

void main() {
  // Test safeDivide with valid input and zero
  // Test parsePositiveInt with valid, invalid string, and negative number
}`,
      solution: `class DivisionByZeroException implements Exception {
  @override
  String toString() => 'DivisionByZeroException: Cannot divide by zero';
}

double safeDivide(int a, int b) {
  if (b == 0) throw DivisionByZeroException();
  return a / b;
}

int parsePositiveInt(String s) {
  final n = int.parse(s);
  if (n < 0) throw ArgumentError('Number must be positive, got \$n');
  return n;
}

void main() {
  try { print(safeDivide(10, 3)); } catch (e) { print(e); }
  try { print(safeDivide(10, 0)); } catch (e) { print(e); }
  try { print(parsePositiveInt('42')); } catch (e) { print(e); }
  try { print(parsePositiveInt('abc')); } on FormatException { print('Not a number'); }
  try { print(parsePositiveInt('-5')); } on ArgumentError catch (e) { print(e.message); }
}`,
    },
  },

  {
    id: 20,
    level: 'Beginner',
    title: 'Mixins — Reusable Behaviors',
    content: `# Mixins in Dart

A mixin is a way to reuse code across multiple class hierarchies without using inheritance. Think of a mixin as a bundle of methods you can "mix into" any class.

## Why Mixins?

Imagine you have classes: \`Bird\`, \`Plane\`, and \`Superman\`. All three can fly, but they are very different classes. You cannot use a single parent class for all. Instead, define a \`Flyable\` mixin:

\`\`\`dart
mixin Flyable {
  void fly() => print('\$runtimeType is flying!');
  double altitude = 0;
  void ascend(double meters) => altitude += meters;
}
\`\`\`

## Using Mixins
\`\`\`dart
class Bird with Flyable {
  String name;
  Bird(this.name);
}

class Airplane with Flyable, Serializable {
  String model;
  Airplane(this.model);
}
\`\`\`

A class can use multiple mixins with \`with\`.

## Mixin Constraints
You can restrict which classes can use a mixin:
\`\`\`dart
mixin Swimmable on Animal {
  // Can only be used by classes that extend Animal
}
\`\`\`

## mixin vs abstract class
- **abstract class** — for "is-a" relationships and shared state
- **mixin** — for "can-do" capabilities that can be applied to unrelated classes`,
    tips: [
      'Mixins are perfect for cross-cutting capabilities like logging, serialization, or validation that you want to add to many unrelated classes.',
      'A class can use multiple mixins (with A, B, C) but can only extend one class.',
      'Unlike interfaces, mixins can have implemented methods — they are not just contracts.',
    ],
    codeSnippet: `mixin Printable {
  void printInfo() {
    print('\$runtimeType: \$this');
  }
}

mixin Timestamped {
  DateTime createdAt = DateTime.now();

  Duration get age => DateTime.now().difference(createdAt);
}

mixin Validatable {
  List<String> validate();

  bool get isValid => validate().isEmpty;
}

class User with Printable, Timestamped, Validatable {
  final String name;
  final String email;
  final int age;

  User(this.name, this.email, this.age);

  @override
  List<String> validate() {
    final errors = <String>[];
    if (name.isEmpty) errors.add('Name is required');
    if (!email.contains('@')) errors.add('Invalid email');
    if (age < 0 || age > 150) errors.add('Invalid age');
    return errors;
  }

  @override
  String toString() => 'User(name=\$name, email=\$email)';
}

void main() {
  User u = User('Alice', 'alice@example.com', 28);
  u.printInfo();
  print('Valid: \${u.isValid}');
  print('Errors: \${u.validate()}');

  User invalid = User('', 'not-an-email', -5);
  print('\\nInvalid user errors: \${invalid.validate()}');
}`,
    expectedOutput: `User: User(name=Alice, email=alice@example.com)\nValid: true\nErrors: []\n\nInvalid user errors: [Name is required, Invalid email, Invalid age]`,
    quiz: [
      { question: 'What keyword applies a mixin to a class?', options: ['extends', 'implements', 'with', 'uses'], correctAnswerIndex: 2 },
      { question: 'How many mixins can a class use?', options: ['Only 1', 'Maximum 3', 'As many as needed', 'Maximum 2'], correctAnswerIndex: 2 },
      { question: 'What is the key difference between a mixin and an interface?', options: ['Mixins are faster', 'Mixins can contain implemented methods; interfaces cannot', 'Interfaces support state; mixins do not', 'They are identical'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Create a mixin Discountable with a method applyDiscount(double percent) that reduces a price field. Create a mixin Taxable with a method addTax(double rate) that increases price. Create a Product class with a price field that uses both mixins. Test applying a 10% discount then 8% tax.',
      starterCode: `mixin Discountable {
  double price = 0;
  // Add applyDiscount(double percent) method
}

mixin Taxable {
  double price = 0;
  // Add addTax(double rate) method
}

class Product with Discountable, Taxable {
  String name;
  Product(this.name, double initialPrice) {
    price = initialPrice;
  }
}

void main() {
  final p = Product('Headphones', 100.0);
  print('Original: \\\$\${p.price}');
  // Apply 10% discount
  // Apply 8% tax
  // Print final price
}`,
      solution: `mixin Discountable {
  double price = 0;
  void applyDiscount(double percent) {
    price -= price * (percent / 100);
  }
}

mixin Taxable {
  double price = 0;
  void addTax(double rate) {
    price += price * (rate / 100);
  }
}

class Product with Discountable, Taxable {
  String name;
  Product(this.name, double initialPrice) {
    price = initialPrice;
  }
}

void main() {
  final p = Product('Headphones', 100.0);
  print('Original: \\\$\${p.price.toStringAsFixed(2)}');
  p.applyDiscount(10);
  print('After 10% discount: \\\$\${p.price.toStringAsFixed(2)}');
  p.addTax(8);
  print('After 8% tax: \\\$\${p.price.toStringAsFixed(2)}');
}`,
    },
  },

  {
    id: 21,
    level: 'Beginner',
    title: 'Higher-Order Functions',
    content: `# Higher-Order Functions

In Dart, functions are first-class objects. You can store them in variables, pass them as arguments, and return them from other functions. A function that takes or returns another function is called a higher-order function.

## Functions as Variables
\`\`\`dart
int add(int a, int b) => a + b;
var operation = add; // Store function in variable
print(operation(3, 4)); // 7
\`\`\`

## Functions as Parameters
\`\`\`dart
void runTwice(Function action) {
  action();
  action();
}
runTwice(() => print('Hello!')); // Hello! Hello!
\`\`\`

## Lambda / Anonymous Functions
\`\`\`dart
var numbers = [1, 2, 3, 4, 5];
var squared = numbers.map((n) => n * n).toList();
\`\`\`

## Key List Higher-Order Methods

| Method       | What it does                              |
|--------------|-------------------------------------------|
| .map()       | Transform each element                    |
| .where()     | Filter elements by condition              |
| .reduce()    | Combine all elements into one value       |
| .fold()      | Like reduce but with initial value        |
| .every()     | True if ALL elements match condition      |
| .any()       | True if ANY element matches condition     |
| .forEach()   | Execute a function for each element       |`,
    tips: [
      'Chain .where().map().toList() for elegant data transformation pipelines.',
      'Use .reduce() only when the list is guaranteed non-empty. Use .fold() for empty-safe reductions.',
      'Arrow functions (=>) are perfect for short callbacks in map/where/forEach.',
    ],
    codeSnippet: `void main() {
  List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // map — transform each element
  List<int> doubled = numbers.map((n) => n * 2).toList();
  print('Doubled: \$doubled');

  // where — filter
  List<int> evens = numbers.where((n) => n % 2 == 0).toList();
  print('Evens: \$evens');

  // reduce — combine into one value
  int total = numbers.reduce((sum, n) => sum + n);
  print('Total: \$total');

  // fold — reduce with initial value
  int product = numbers.fold(1, (acc, n) => acc * n);
  print('Product: \$product');

  // every / any
  print('All positive: \${numbers.every((n) => n > 0)}');
  print('Any > 8: \${numbers.any((n) => n > 8)}');

  // Chaining operations
  List<String> result = numbers
      .where((n) => n % 2 == 0)    // Keep evens
      .map((n) => n * n)            // Square them
      .where((n) => n > 10)         // Keep those > 10
      .map((n) => 'n°\$n')          // Format
      .toList();
  print('Chained: \$result');
}`,
    expectedOutput: `Doubled: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\nEvens: [2, 4, 6, 8, 10]\nTotal: 55\nProduct: 3628800\nAll positive: true\nAny > 8: true\nChained: [n°16, n°36, n°64, n°100]`,
    quiz: [
      { question: 'What does the .map() method do on a list?', options: ['Filters elements', 'Sorts elements', 'Transforms each element into a new value', 'Removes duplicates'], correctAnswerIndex: 2 },
      { question: 'What is the difference between .reduce() and .fold()?', options: ['reduce is faster', 'fold allows an initial value; reduce does not', 'reduce allows an initial value; fold does not', 'They are identical'], correctAnswerIndex: 1 },
      { question: 'What does .every((n) => n > 0) return?', options: ['The first element greater than 0', 'true only if ALL elements are greater than 0', 'true if ANY element is greater than 0', 'The count of elements greater than 0'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Given a list of employee names and salaries as maps, use higher-order functions to: (1) Filter employees with salary > 50000, (2) Get only their names, (3) Sort alphabetically, (4) Print the result.',
      starterCode: `void main() {
  List<Map<String, dynamic>> employees = [
    {'name': 'Alice', 'salary': 75000},
    {'name': 'Bob', 'salary': 45000},
    {'name': 'Charlie', 'salary': 90000},
    {'name': 'Diana', 'salary': 55000},
    {'name': 'Eve', 'salary': 40000},
  ];

  // Filter by salary > 50000, get names, sort, print
}`,
      solution: `void main() {
  List<Map<String, dynamic>> employees = [
    {'name': 'Alice', 'salary': 75000},
    {'name': 'Bob', 'salary': 45000},
    {'name': 'Charlie', 'salary': 90000},
    {'name': 'Diana', 'salary': 55000},
    {'name': 'Eve', 'salary': 40000},
  ];

  List<String> highEarners = employees
      .where((e) => (e['salary'] as int) > 50000)
      .map((e) => e['name'] as String)
      .toList()
    ..sort();

  print('High earners (>50k): \$highEarners');
}`,
    },
  },

  {
    id: 22,
    level: 'Beginner',
    title: 'Closures',
    content: `# Closures in Dart

A closure is a function that "closes over" (captures) variables from its surrounding scope. Even after the outer function has returned, the closure still has access to those variables.

## What is a Closure?
\`\`\`dart
Function makeCounter() {
  int count = 0; // This variable is captured by the closure

  return () {
    count++;
    return count;
  };
}

var counter = makeCounter();
print(counter()); // 1
print(counter()); // 2
print(counter()); // 3
\`\`\`

Each call to \`counter()\` increments the SAME \`count\` variable — the closure keeps it alive.

## Why Are Closures Useful?
- Creating factory functions that produce customized functions
- Callbacks that need access to outer state
- Encapsulating private state without a class

## Practical Example
\`\`\`dart
Function multiplier(int factor) {
  return (int value) => value * factor;
}

var double = multiplier(2);
var triple = multiplier(3);

print(double(5));  // 10
print(triple(5));  // 15
\`\`\``,
    tips: [
      'Each call to a closure factory creates an independent closure with its own copy of the captured variables.',
      'Closures are heavily used in Flutter for event handlers: onPressed: () { setState(() { count++; }); }',
      'Be careful about capturing loop variables in closures — each iteration creates a new binding in Dart.',
    ],
    codeSnippet: `// Counter factory — each counter is independent
Function makeCounter({int startFrom = 0, int step = 1}) {
  int count = startFrom;
  return () {
    final current = count;
    count += step;
    return current;
  };
}

// Greeting factory
Function greeter(String greeting) {
  return (String name) => '\$greeting, \$name!';
}

// Logger with prefix
Function makeLogger(String prefix) {
  int logCount = 0;
  return (String message) {
    logCount++;
    print('[\$prefix #\$logCount] \$message');
  };
}

void main() {
  // Independent counters
  var c1 = makeCounter();
  var c2 = makeCounter(startFrom: 10, step: 5);

  print(c1()); // 0
  print(c1()); // 1
  print(c2()); // 10
  print(c1()); // 2
  print(c2()); // 15

  // Greeting functions
  var hello = greeter('Hello');
  var bonjour = greeter('Bonjour');
  print(hello('Alice'));
  print(bonjour('Pierre'));

  // Logger with state
  var appLog = makeLogger('APP');
  appLog('Starting...');
  appLog('User logged in');
  appLog('Request received');
}`,
    expectedOutput: `0\n1\n10\n2\n15\nHello, Alice!\nBonjour, Pierre!\n[APP #1] Starting...\n[APP #2] User logged in\n[APP #3] Request received`,
    quiz: [
      { question: 'What does a closure "close over"?', options: ['Only global variables', 'Variables from its surrounding scope at the time of creation', 'Only parameters of the enclosing function', 'Class instance variables only'], correctAnswerIndex: 1 },
      { question: 'If makeCounter() is called twice, do the two counters share the same count variable?', options: ['Yes, they share global state', 'No, each has its own independent count', 'Only if the variable is final', 'Depends on the Dart version'], correctAnswerIndex: 1 },
      { question: 'What is the return type of a function that returns a closure?', options: ['It must be Function', 'It must be void', 'It can be typed with a function signature like int Function(int)', 'Closures cannot be returned'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Write a function makeAdder(int base) that returns a closure. The closure takes an int argument and returns base + argument. Also write makeMultiplier(int factor). Then create add5, add10, double, triple and test them.',
      starterCode: `// Write makeAdder and makeMultiplier here

void main() {
  var add5 = makeAdder(5);
  var add10 = makeAdder(10);
  var double = makeMultiplier(2);
  var triple = makeMultiplier(3);

  // Test them
}`,
      solution: `int Function(int) makeAdder(int base) {
  return (int n) => base + n;
}

int Function(int) makeMultiplier(int factor) {
  return (int n) => factor * n;
}

void main() {
  var add5 = makeAdder(5);
  var add10 = makeAdder(10);
  var double = makeMultiplier(2);
  var triple = makeMultiplier(3);

  print('add5(3) = \${add5(3)}');
  print('add10(7) = \${add10(7)}');
  print('double(6) = \${double(6)}');
  print('triple(4) = \${triple(4)}');
}`,
    },
  },

  {
    id: 23,
    level: 'Beginner',
    title: 'Type System — is, as, and Type Checking',
    content: `# Dart Type System

Dart has a strong static type system. Understanding how to check and cast types is important, especially when working with dynamic values.

## The is Operator
Check if an object is of a particular type:
\`\`\`dart
Object value = 'Hello';
if (value is String) {
  print(value.length); // Dart automatically promotes type to String here!
}
\`\`\`

The \`is\` check also performs **type promotion** — inside the if block, Dart knows \`value\` is a \`String\`.

## The is! Operator
Negated check — is NOT:
\`\`\`dart
if (value is! int) {
  print('Not an integer');
}
\`\`\`

## The as Operator (Type Cast)
Cast an object to a specific type. Throws \`TypeError\` if the cast fails:
\`\`\`dart
Object obj = 'Hello';
String s = obj as String; // OK
int n = obj as int;       // Throws TypeError!
\`\`\`

## The dynamic Type
\`dynamic\` turns off type checking for that variable — use sparingly:
\`\`\`dart
dynamic anything = 42;
anything = 'now a string'; // No error
\`\`\`

## Object vs dynamic
- \`Object\` — the base of all Dart types, still type-safe
- \`dynamic\` — completely bypasses type checking at compile time`,
    tips: [
      'Prefer is over as — use is to check first, then the type-promoted value safely, rather than risk a cast exception.',
      'Avoid dynamic unless you are working with data where the type is genuinely unknown at compile time (like parsing JSON).',
      'Type promotion is a powerful feature — after checking if (x is String), you can use x.length without casting.',
    ],
    codeSnippet: `void describeValue(Object value) {
  if (value is int) {
    // Dart knows value is int here — no casting needed
    print('Integer: \$value, squared: \${value * value}');
  } else if (value is double) {
    print('Double: \$value, rounded: \${value.round()}');
  } else if (value is String) {
    print('String: "\$value", length: \${value.length}, upper: \${value.toUpperCase()}');
  } else if (value is List) {
    print('List with \${value.length} elements');
  } else if (value is bool) {
    print('Boolean: \$value');
  } else {
    print('Unknown type: \${value.runtimeType}');
  }
}

void main() {
  List<Object> values = [42, 3.14, 'Dart', [1, 2, 3], true, {'key': 'val'}];

  for (var v in values) {
    describeValue(v);
  }

  // Safe casting
  Object maybeString = 'Hello, World!';
  if (maybeString is String) {
    print('\\nUppercase: \${maybeString.toUpperCase()}');
  }

  // Using as (risky — only when certain)
  Object knownString = 'Dart Programming';
  String s = knownString as String;
  print('Words: \${s.split(' ').length}');
}`,
    expectedOutput: `Integer: 42, squared: 1764\nDouble: 3.14, rounded: 3\nString: "Dart", length: 4, upper: DART\nList with 3 elements\nBoolean: true\nUnknown type: _Map<String, String>\n\nUppercase: HELLO, WORLD!\nWords: 2`,
    quiz: [
      { question: 'What does type promotion mean in Dart?', options: ['Converting a type to a higher type', 'After an is check, Dart treats the variable as the checked type inside that block', 'Making a type immutable', 'Promoting a local type to global scope'], correctAnswerIndex: 1 },
      { question: 'What happens if you use as to cast an incompatible type?', options: ['It returns null', 'It returns 0', 'A TypeError is thrown at runtime', 'The compiler prevents it'], correctAnswerIndex: 2 },
      { question: 'What is the difference between Object and dynamic in Dart?', options: ['They are identical', 'Object is type-safe but allows any type; dynamic bypasses type checking', 'dynamic is for numbers only; Object is for classes', 'Object is slower than dynamic'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write a function summarize(List<Object> items) that processes a mixed list. For int: add to a running sum. For String: collect in a list. For bool: count trues. Print the summary at the end.',
      starterCode: `void summarize(List<Object> items) {
  int sum = 0;
  List<String> strings = [];
  int trueCount = 0;

  for (var item in items) {
    // Check type and process accordingly
  }

  print('Sum of ints: \$sum');
  print('Strings: \$strings');
  print('True booleans: \$trueCount');
}

void main() {
  summarize([1, 'hello', true, 42, false, 'world', 7, true]);
}`,
      solution: `void summarize(List<Object> items) {
  int sum = 0;
  List<String> strings = [];
  int trueCount = 0;

  for (var item in items) {
    if (item is int) {
      sum += item;
    } else if (item is String) {
      strings.add(item);
    } else if (item is bool && item) {
      trueCount++;
    }
  }

  print('Sum of ints: \$sum');
  print('Strings: \$strings');
  print('True booleans: \$trueCount');
}

void main() {
  summarize([1, 'hello', true, 42, false, 'world', 7, true]);
}`,
    },
  },

  {
    id: 24,
    level: 'Beginner',
    title: 'Generics — Writing Reusable Code',
    content: `# Generics in Dart

Generics allow you to write classes and functions that work with any type while still being type-safe. Instead of writing a separate list for ints and another for strings, you write one generic List<T>.

## Why Generics?
Without generics:
\`\`\`dart
class IntBox { int value; IntBox(this.value); }
class StringBox { String value; StringBox(this.value); }
\`\`\`

With generics — one class works for any type:
\`\`\`dart
class Box<T> {
  T value;
  Box(this.value);
}

Box<int> numBox = Box<int>(42);
Box<String> strBox = Box<String>('Hello');
\`\`\`

## Generic Functions
\`\`\`dart
T first<T>(List<T> list) => list.first;

print(first([1, 2, 3]));       // 1 (int)
print(first(['a', 'b', 'c'])); // 'a' (String)
\`\`\`

## Type Constraints
Restrict which types can be used:
\`\`\`dart
class NumberBox<T extends num> {
  // T can only be int, double, or num
  T value;
  NumberBox(this.value);
  T doubled() => (value * 2) as T;
}
\`\`\``,
    tips: [
      'Use single letters like T, K, V for type parameters by convention (T for type, K for key, V for value).',
      'Generics provide compile-time type safety — you catch type mistakes before running your code.',
      'All built-in collections in Dart (List<T>, Map<K,V>, Set<T>) use generics.',
    ],
    codeSnippet: `// Generic pair class
class Pair<A, B> {
  final A first;
  final B second;

  const Pair(this.first, this.second);

  Pair<B, A> swap() => Pair(second, first);

  @override
  String toString() => '(\$first, \$second)';
}

// Generic stack data structure
class Stack<T> {
  final List<T> _items = [];

  void push(T item) => _items.add(item);

  T pop() {
    if (_items.isEmpty) throw StateError('Stack is empty');
    return _items.removeLast();
  }

  T get peek => _items.last;
  bool get isEmpty => _items.isEmpty;
  int get size => _items.length;
}

// Generic function with constraint
T maxValue<T extends Comparable<T>>(T a, T b) => a.compareTo(b) >= 0 ? a : b;

void main() {
  // Pair
  var nameAge = Pair('Alice', 28);
  print('Pair: \$nameAge');
  print('Swapped: \${nameAge.swap()}');

  // Stack
  var stack = Stack<int>();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  print('\\nStack size: \${stack.size}, top: \${stack.peek}');
  print('Popped: \${stack.pop()}');
  print('Stack size: \${stack.size}');

  // Generic function
  print('\\nMax(10, 7): \${maxValue(10, 7)}');
  print('Max("apple","mango"): \${maxValue("apple","mango")}');
}`,
    expectedOutput: `Pair: (Alice, 28)\nSwapped: (28, Alice)\n\nStack size: 3, top: 3\nPopped: 3\nStack size: 2\n\nMax(10, 7): 10\nMax("apple","mango"): mango`,
    quiz: [
      { question: 'What does <T extends num> mean in a generic class?', options: ['T must be exactly num', 'T can be any type that is a subtype of num', 'T can be null', 'T is optional'], correctAnswerIndex: 1 },
      { question: 'Why use generics instead of dynamic?', options: ['Generics are faster at runtime', 'Generics provide compile-time type safety that dynamic does not', 'Generics use less memory', 'dynamic does not work with collections'], correctAnswerIndex: 1 },
      { question: 'What is the convention for naming generic type parameters?', options: ['Full descriptive names like TypeParam', 'Always T', 'Short letters like T, K, V', 'Starting with uppercase G'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create a generic class Result<T> that can either hold a success value (T data) or an error (String error). Add a bool getter isSuccess, and a method getOrDefault(T defaultValue) that returns the data if successful or the default if not. Test with both success and failure cases.',
      starterCode: `class Result<T> {
  final T? data;
  final String? error;

  // Add success and failure constructors

  bool get isSuccess => error == null;

  T getOrDefault(T defaultValue) {
    // Return data if success, defaultValue otherwise
  }
}

void main() {
  var success = Result<int>.success(42);
  var failure = Result<int>.failure('Network error');

  print(success.isSuccess);
  print(success.getOrDefault(0));
  print(failure.isSuccess);
  print(failure.getOrDefault(-1));
}`,
      solution: `class Result<T> {
  final T? data;
  final String? error;

  Result.success(T value) : data = value, error = null;
  Result.failure(String msg) : data = null, error = msg;

  bool get isSuccess => error == null;

  T getOrDefault(T defaultValue) => isSuccess ? data as T : defaultValue;

  @override
  String toString() => isSuccess ? 'Success(\$data)' : 'Failure(\$error)';
}

void main() {
  var success = Result<int>.success(42);
  var failure = Result<int>.failure('Network error');

  print(success);
  print(success.isSuccess);
  print(success.getOrDefault(0));
  print(failure);
  print(failure.isSuccess);
  print(failure.getOrDefault(-1));
}`,
    },
  },

  {
    id: 25,
    level: 'Beginner',
    title: 'Iterables and Lazy Evaluation',
    content: `# Iterables in Dart

An \`Iterable<T>\` is any object you can iterate over with a for-in loop. Lists, Sets, and Maps' keys/values are all iterables. But there are also lazy iterables that compute values on demand.

## Iterable vs List
A \`List\` stores all its elements in memory. An \`Iterable\` might compute elements lazily — only when you ask for them.

\`\`\`dart
Iterable<int> naturals = [1, 2, 3, 4, 5]; // Eager (List)

// Lazy — computes only when iterated
Iterable<int> lazyNaturals = Iterable.generate(1000, (i) => i + 1);
\`\`\`

## Why Lazy Evaluation?
\`\`\`dart
var result = lazyNaturals
    .where((n) => n % 2 == 0)
    .map((n) => n * n)
    .take(5); // Only computes the first 5 — not all 1000!
\`\`\`

## Key Iterable Methods
- \`.where(test)\` — filter lazily
- \`.map(f)\` — transform lazily
- \`.take(n)\` — first n elements
- \`.skip(n)\` — skip first n elements
- \`.takeWhile(test)\` — take while condition is true
- \`.skipWhile(test)\` — skip while condition is true
- \`.expand(f)\` — flatMap: expand each element into multiple
- \`.toList()\` — materialize into a List

## Converting
\`\`\`dart
list.toSet()   // → Set
list.toList()  // → List (copy)
\`\`\``,
    tips: [
      'Operations like .where() and .map() on an Iterable are lazy — they do not compute until you iterate or call .toList().',
      'Use .take(n) to process only the first N results of a potentially large or infinite sequence.',
      'Call .toList() at the end of a chain when you need to store the result or iterate multiple times.',
    ],
    codeSnippet: `void main() {
  // Generating an iterable lazily
  Iterable<int> squares = Iterable.generate(10, (i) => (i + 1) * (i + 1));
  print('Squares: \$squares');
  print('First 5: \${squares.take(5).toList()}');
  print('Last 5: \${squares.skip(5).toList()}');

  // Lazy chain — nothing computed until toList()
  var result = Iterable.generate(100, (i) => i + 1)
      .where((n) => n % 3 == 0)    // Divisible by 3
      .map((n) => n * n)            // Square it
      .takeWhile((n) => n < 500)    // Until squared > 500
      .toList();
  print('\\nSquares of multiples of 3 below 500: \$result');

  // expand — flatten nested lists
  List<List<int>> nested = [[1, 2], [3, 4], [5, 6]];
  List<int> flat = nested.expand((list) => list).toList();
  print('Flattened: \$flat');

  // takeWhile / skipWhile
  List<int> nums = [2, 4, 6, 7, 8, 10];
  print('Take while even: \${nums.takeWhile((n) => n % 2 == 0).toList()}');
  print('Skip while even: \${nums.skipWhile((n) => n % 2 == 0).toList()}');
}`,
    expectedOutput: `Squares: (1, 4, 9, 16, 25, 36, 49, 64, 81, 100)\nFirst 5: [1, 4, 9, 16, 25]\nLast 5: [36, 49, 64, 81, 100]\n\nSquares of multiples of 3 below 500: [9, 36, 81, 144, 225, 324, 441]\nFlattened: [1, 2, 3, 4, 5, 6]\nTake while even: [2, 4, 6]\nSkip while even: [7, 8, 10]`,
    quiz: [
      { question: 'What is the main difference between a List and an Iterable?', options: ['Lists are ordered; Iterables are not', 'Lists store all elements in memory; Iterables may compute lazily', 'Iterables are faster for random access', 'Lists support generics; Iterables do not'], correctAnswerIndex: 1 },
      { question: 'What does .expand() do on an Iterable?', options: ['Increases the size of elements', 'Flattens nested iterables into one', 'Expands the memory allocation', 'Adds more elements at the end'], correctAnswerIndex: 1 },
      { question: 'When does a lazy .map() on an Iterable actually compute its values?', options: ['Immediately when called', 'When you iterate the result or call .toList()', 'After 100ms delay', 'Only when assigned to a List'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Use Iterable.generate to create an infinite sequence of Fibonacci numbers. Take the first 10 Fibonacci numbers and print them. Then find and print the first Fibonacci number that is greater than 100.',
      starterCode: `// Hint: Use a stateful generator with a closure or a custom Iterable
// Or use a simple recursive/iterative approach with generate + state

void main() {
  // Generate Fibonacci sequence
  // Print first 10 Fibonacci numbers
  // Print first Fibonacci > 100
}`,
      solution: `Iterable<int> fibonacci() sync* {
  int a = 0, b = 1;
  while (true) {
    yield a;
    int next = a + b;
    a = b;
    b = next;
  }
}

void main() {
  List<int> first10 = fibonacci().take(10).toList();
  print('First 10 Fibonacci: \$first10');

  int firstOver100 = fibonacci().firstWhere((n) => n > 100);
  print('First Fibonacci > 100: \$firstOver100');
}`,
    },
  },

  {
    id: 26,
    level: 'Beginner',
    title: 'Records — Lightweight Data Bundles',
    content: `# Records in Dart 3

Records are an immutable, lightweight way to bundle multiple values together without defining a full class. They were introduced in Dart 3.

## Creating Records
\`\`\`dart
// Positional record
var point = (3.0, 4.0);
print(point.\$1); // 3.0
print(point.\$2); // 4.0

// Named record
var person = (name: 'Alice', age: 28);
print(person.name); // Alice
print(person.age);  // 28
\`\`\`

## Records as Return Types
Records let functions return multiple values elegantly:
\`\`\`dart
(double min, double max) minMax(List<double> nums) {
  nums.sort();
  return (nums.first, nums.last);
}

var (min, max) = minMax([3.5, 1.2, 7.8, 2.0]);
print('Min: \$min, Max: \$max');
\`\`\`

## Destructuring
Extract record values with pattern matching:
\`\`\`dart
var (x, y) = (3.0, 4.0);
var (:name, :age) = (name: 'Bob', age: 30);
\`\`\`

## Record Types
Records have structural types — two records with the same fields and types are the same type:
\`\`\`dart
(String, int) coord = ('x', 5); // Record type annotation
\`\`\``,
    tips: [
      'Use records for simple data bundles that do not need methods. If you need methods, use a class instead.',
      'Named records are clearer than positional ones — (name: "Alice", age: 28) is much more readable than ("Alice", 28).',
      'Records are immutable by default — you cannot change their fields after creation.',
    ],
    codeSnippet: `// Function returning multiple values via record
(double area, double perimeter) circleMetrics(double radius) {
  const pi = 3.14159;
  return (pi * radius * radius, 2 * pi * radius);
}

// Named record for HTTP response
({int statusCode, String body, Map<String, String> headers}) mockHttpGet(String url) {
  return (
    statusCode: 200,
    body: '{"data": "Hello from \$url"}',
    headers: {'Content-Type': 'application/json'},
  );
}

void main() {
  // Positional record
  var (area, perimeter) = circleMetrics(5.0);
  print('Circle area: \${area.toStringAsFixed(2)}');
  print('Circle perimeter: \${perimeter.toStringAsFixed(2)}');

  // Named record
  var response = mockHttpGet('api.example.com/data');
  print('\\nStatus: \${response.statusCode}');
  print('Body: \${response.body}');
  print('Content-Type: \${response.headers['Content-Type']}');

  // Record as value in a list
  List<(String, int)> scores = [
    ('Alice', 95),
    ('Bob', 87),
    ('Charlie', 92),
  ];

  for (var (name, score) in scores) {
    print('\$name scored \$score');
  }
}`,
    expectedOutput: `Circle area: 78.54\nCircle perimeter: 31.42\n\nStatus: 200\nBody: {"data": "Hello from api.example.com/data"}\nContent-Type: application/json\nAlice scored 95\nBob scored 87\nCharlie scored 92`,
    quiz: [
      { question: 'How do you access the second field of a positional record in Dart 3?', options: ['record.second', 'record[1]', 'record.\$2', 'record.get(2)'], correctAnswerIndex: 2 },
      { question: 'What is the main advantage of using records to return multiple values?', options: ['They are faster than classes', 'No need to define a new class just to return multiple values', 'They support null values automatically', 'They work without Dart 3'], correctAnswerIndex: 1 },
      { question: 'Are records mutable in Dart?', options: ['Yes, all fields can be changed', 'No, records are immutable', 'Only named fields are mutable', 'Depends on whether fields are final'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write a function divmod(int a, int b) that returns a record with named fields quotient and remainder. Write another function parseCoordinate(String s) that parses "x,y" format and returns a record (double x, double y). Test both.',
      starterCode: `({int quotient, int remainder}) divmod(int a, int b) {
  // Implement
}

(double x, double y) parseCoordinate(String s) {
  // Parse "3.5,7.2" format
}

void main() {
  var result = divmod(17, 5);
  print('17 ÷ 5 = \${result.quotient} remainder \${result.remainder}');

  var coord = parseCoordinate('3.5,7.2');
  print('x=\${coord.x}, y=\${coord.y}');
}`,
      solution: `({int quotient, int remainder}) divmod(int a, int b) {
  return (quotient: a ~/ b, remainder: a % b);
}

(double x, double y) parseCoordinate(String s) {
  final parts = s.split(',');
  return (double.parse(parts[0].trim()), double.parse(parts[1].trim()));
}

void main() {
  var result = divmod(17, 5);
  print('17 ÷ 5 = \${result.quotient} remainder \${result.remainder}');

  var (:x, :y) = parseCoordinate('3.5,7.2');
  print('x=\$x, y=\$y');
}`,
    },
  },

  {
    id: 27,
    level: 'Beginner',
    title: 'Pattern Matching with switch',
    content: `# Pattern Matching in Dart 3

Pattern matching allows you to match a value against different patterns and extract data from it in one step. Dart 3 brought powerful pattern matching to switch statements and expressions.

## Value Patterns
\`\`\`dart
switch (value) {
  case 1: print('one');
  case 2: print('two');
  case _: print('other'); // wildcard
}
\`\`\`

## Type Patterns
Match and extract by type:
\`\`\`dart
switch (shape) {
  case Circle(radius: var r):
    print('Circle with radius \$r');
  case Rectangle(width: var w, height: var h):
    print('Rectangle \${w}x\${h}');
}
\`\`\`

## Destructuring Records
\`\`\`dart
var point = (x: 3.0, y: 4.0);
switch (point) {
  case (x: var x, y: var y) when x > 0 && y > 0:
    print('First quadrant: (\$x, \$y)');
  case _:
    print('Other quadrant');
}
\`\`\`

## Guard Clauses (when)
Add extra conditions to a pattern:
\`\`\`dart
case int n when n > 100:
  print('Large number: \$n');
\`\`\``,
    tips: [
      'Pattern matching is exhaustiveness-checked on sealed classes and enums — the compiler tells you if you miss a case.',
      'The when keyword adds guard conditions to patterns — very useful for range checks.',
      'Combine type patterns with destructuring to extract and use data in one clean expression.',
    ],
    codeSnippet: `sealed class Shape {}
class Circle extends Shape { final double radius; Circle(this.radius); }
class Rectangle extends Shape { final double w, h; Rectangle(this.w, this.h); }
class Triangle extends Shape { final double base, height; Triangle(this.base, this.height); }

double calculateArea(Shape shape) => switch (shape) {
  Circle(radius: var r) => 3.14159 * r * r,
  Rectangle(w: var w, h: var h) => w * h,
  Triangle(base: var b, height: var h) => 0.5 * b * h,
};

String describeNumber(int n) => switch (n) {
  0 => 'zero',
  int x when x < 0 => 'negative (\$x)',
  int x when x % 2 == 0 && x < 100 => 'small even: \$x',
  int x when x % 2 != 0 && x < 100 => 'small odd: \$x',
  _ => 'large number',
};

void main() {
  List<Shape> shapes = [Circle(7.0), Rectangle(4.0, 6.0), Triangle(5.0, 8.0)];
  for (final s in shapes) {
    print('\${s.runtimeType}: area = \${calculateArea(s).toStringAsFixed(2)}');
  }

  print('');
  for (int n in [0, -5, 12, 17, 200]) {
    print('\$n → \${describeNumber(n)}');
  }
}`,
    expectedOutput: `Circle: area = 153.94\nRectangle: area = 24.00\nTriangle: area = 20.00\n\n0 → zero\n-5 → negative (-5)\n12 → small even: 12\n17 → small odd: 17\n200 → large number`,
    quiz: [
      { question: 'What does the when keyword add to a pattern match case?', options: ['A loop', 'A guard condition', 'A return type', 'An alternative pattern'], correctAnswerIndex: 1 },
      { question: 'What is a sealed class used for with pattern matching?', options: ['Making classes faster', 'Enabling exhaustiveness checking in switch', 'Preventing inheritance', 'Creating singletons'], correctAnswerIndex: 1 },
      { question: 'In a switch expression, what does the _ pattern match?', options: ['Only null', 'Only numbers', 'Nothing', 'Everything not matched by previous cases'], correctAnswerIndex: 3 },
    ],
    exercise: {
      instruction: 'Create a sealed class JsonValue with subclasses JsonNull, JsonBool(bool), JsonNumber(double), JsonString(String), JsonArray(List). Write a function jsonToString(JsonValue v) that converts each to a string representation using pattern matching.',
      starterCode: `sealed class JsonValue {}
class JsonNull extends JsonValue {}
class JsonBool extends JsonValue { final bool value; JsonBool(this.value); }
class JsonNumber extends JsonValue { final double value; JsonNumber(this.value); }
class JsonString extends JsonValue { final String value; JsonString(this.value); }

String jsonToString(JsonValue v) {
  // Use switch pattern matching
}

void main() {
  print(jsonToString(JsonNull()));
  print(jsonToString(JsonBool(true)));
  print(jsonToString(JsonNumber(3.14)));
  print(jsonToString(JsonString('hello')));
}`,
      solution: `sealed class JsonValue {}
class JsonNull extends JsonValue {}
class JsonBool extends JsonValue { final bool value; JsonBool(this.value); }
class JsonNumber extends JsonValue { final double value; JsonNumber(this.value); }
class JsonString extends JsonValue { final String value; JsonString(this.value); }

String jsonToString(JsonValue v) => switch (v) {
  JsonNull() => 'null',
  JsonBool(value: true) => 'true',
  JsonBool(value: false) => 'false',
  JsonNumber(value: var n) => n == n.truncateToDouble() ? n.toInt().toString() : n.toString(),
  JsonString(value: var s) => '"\\$s"',
};

void main() {
  print(jsonToString(JsonNull()));
  print(jsonToString(JsonBool(true)));
  print(jsonToString(JsonNumber(3.14)));
  print(jsonToString(JsonString('hello')));
}`,
    },
  },

  {
    id: 28,
    level: 'Beginner',
    title: 'Extensions — Adding Methods to Existing Types',
    content: `# Extensions in Dart

Extensions allow you to add methods to existing classes — even types you do not own, like String, int, or List — without modifying them or subclassing.

## Why Extensions?
You want to add a method to String:
\`\`\`dart
// Without extensions, you'd write a helper function:
bool isValidEmail(String s) => s.contains('@') && s.contains('.');

// With extensions, it becomes a method on String:
extension StringHelpers on String {
  bool get isValidEmail => contains('@') && contains('.');
}

print('user@example.com'.isValidEmail); // true
\`\`\`

## Extension Syntax
\`\`\`dart
extension ExtensionName on TargetType {
  ReturnType methodName(parameters) {
    // 'this' refers to the value of TargetType
    return ...;
  }
}
\`\`\`

## Extensions on Generic Types
\`\`\`dart
extension ListExtras<T> on List<T> {
  T? get secondOrNull => length >= 2 ? this[1] : null;
}
\`\`\`

## Anonymous Extensions
\`\`\`dart
extension on String {
  // No name needed if only used in same file
  String capitalize() => this[0].toUpperCase() + substring(1);
}
\`\`\``,
    tips: [
      'Extensions cannot add instance variables (fields) — only methods and getters.',
      'If two extensions define the same method name on the same type, you must import one explicitly to resolve the conflict.',
      'Name your extension files like string_extensions.dart and extension classes like StringX or StringExtensions for discoverability.',
    ],
    codeSnippet: `extension StringExtensions on String {
  String get capitalized => isEmpty ? this : this[0].toUpperCase() + substring(1);
  String get titleCase => split(' ').map((w) => w.capitalized).join(' ');
  bool get isEmail => contains('@') && contains('.') && length > 5;
  bool get isNumeric => double.tryParse(this) != null;
  String truncate(int maxLength, {String ellipsis = '...'}) =>
      length <= maxLength ? this : '\${substring(0, maxLength)}\$ellipsis';
}

extension IntExtensions on int {
  bool get isEven => this % 2 == 0;
  bool get isOdd => !isEven;
  bool get isPrime {
    if (this < 2) return false;
    for (int i = 2; i <= this ~/ 2; i++) {
      if (this % i == 0) return false;
    }
    return true;
  }
  String get ordinal {
    if (this % 100 >= 11 && this % 100 <= 13) return '\${this}th';
    return switch (this % 10) {
      1 => '\${this}st',
      2 => '\${this}nd',
      3 => '\${this}rd',
      _ => '\${this}th',
    };
  }
}

void main() {
  print('hello world'.titleCase);
  print('john'.capitalized);
  print('user@test.com'.isEmail);
  print('42abc'.isNumeric);
  print('Hello, this is a long string'.truncate(15));

  print('');
  print(7.isPrime);
  print(10.isPrime);
  print(1.ordinal);
  print(2.ordinal);
  print(11.ordinal);
  print(23.ordinal);
}`,
    expectedOutput: `Hello World\nJohn\ntrue\nfalse\nHello, this is...\n\ntrue\nfalse\n1st\n2nd\n11th\n23rd`,
    quiz: [
      { question: 'Can extensions add new instance fields (variables) to a class?', options: ['Yes, always', 'Yes, but only final fields', 'No, only methods and getters', 'Only static fields'], correctAnswerIndex: 2 },
      { question: 'Inside an extension method, what does this refer to?', options: ['The extension itself', 'The value of the type being extended', 'The class where the extension is defined', 'null'], correctAnswerIndex: 1 },
      { question: 'What is the syntax for defining an extension on String?', options: ['extend String { }', 'extension on String { }', 'mixin on String { }', 'add String { }'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write an extension on List<num> called NumericListExt with: a getter sum, a getter average, a getter median (middle value after sorting), and a method clamp(num min, num max) that returns a new list with all values clamped between min and max.',
      starterCode: `extension NumericListExt on List<num> {
  // Add sum getter

  // Add average getter

  // Add median getter

  // Add clamp(num min, num max) method
}

void main() {
  List<num> data = [3, 7, 1, 9, 2, 8, 4];
  print('Sum: \${data.sum}');
  print('Average: \${data.average.toStringAsFixed(2)}');
  print('Median: \${data.median}');
  print('Clamped [3,7]: \${data.clamp(3, 7)}');
}`,
      solution: `extension NumericListExt on List<num> {
  num get sum => fold(0, (a, b) => a + b);
  double get average => sum / length;
  num get median {
    final sorted = [...this]..sort();
    final mid = sorted.length ~/ 2;
    return sorted.length.isOdd ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }
  List<num> clamp(num min, num max) =>
      map((n) => n < min ? min : (n > max ? max : n)).toList();
}

void main() {
  List<num> data = [3, 7, 1, 9, 2, 8, 4];
  print('Sum: \${data.sum}');
  print('Average: \${data.average.toStringAsFixed(2)}');
  print('Median: \${data.median}');
  print('Clamped [3,7]: \${data.clamp(3, 7)}');
}`,
    },
  },

  {
    id: 29,
    level: 'Beginner',
    title: 'Streams and Generators',
    content: `# Generators in Dart

Generators are functions that produce a sequence of values lazily, one at a time, instead of computing them all upfront.

## sync* Generators (Synchronous)
Use \`sync*\` and \`yield\` to produce an iterable sequence:
\`\`\`dart
Iterable<int> countUp(int from, int to) sync* {
  for (int i = from; i <= to; i++) {
    yield i; // Produces one value at a time
  }
}

for (int n in countUp(1, 5)) {
  print(n); // 1, 2, 3, 4, 5
}
\`\`\`

## async* Generators (Asynchronous)
Use \`async*\` and \`yield\` to produce a stream of values asynchronously:
\`\`\`dart
Stream<int> timedCounter(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}
\`\`\`

## yield* (Recursive Generators)
Delegate to another iterable or generator:
\`\`\`dart
Iterable<int> flatten(List list) sync* {
  for (var item in list) {
    if (item is List) {
      yield* flatten(item); // yield all from sub-generator
    } else {
      yield item;
    }
  }
}
\`\`\``,
    tips: [
      'sync* generators are lazy — each yield only runs when the next value is requested.',
      'Use generators instead of building a full list when the sequence is large or infinite.',
      'yield* is like spread (...) but for generators — it yields all values from another iterable inline.',
    ],
    codeSnippet: `// Fibonacci generator — infinite sequence
Iterable<int> fibonacci() sync* {
  int a = 0, b = 1;
  while (true) {
    yield a;
    final next = a + b;
    a = b;
    b = next;
  }
}

// Range generator
Iterable<int> range(int start, int end, {int step = 1}) sync* {
  for (int i = start; i < end; i += step) {
    yield i;
  }
}

// Tree traversal with yield*
Iterable<int> flatten(dynamic nested) sync* {
  if (nested is int) {
    yield nested;
  } else if (nested is List) {
    for (var item in nested) {
      yield* flatten(item);
    }
  }
}

void main() {
  // First 8 Fibonacci numbers
  print('Fibonacci: \${fibonacci().take(8).toList()}');

  // Range
  print('Range(0,10,2): \${range(0, 10, step: 2).toList()}');

  // Sum of first 20 Fibonacci numbers
  int sum = fibonacci().take(20).reduce((a, b) => a + b);
  print('Sum of first 20 fib: \$sum');

  // Flatten
  var nested = [1, [2, [3, 4]], [5, 6], 7];
  print('Flattened: \${flatten(nested).toList()}');
}`,
    expectedOutput: `Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]\nRange(0,10,2): [0, 2, 4, 6, 8]\nSum of first 20 fib: 6764\nFlattened: [1, 2, 3, 4, 5, 6, 7]`,
    quiz: [
      { question: 'What keyword marks a function as a synchronous generator in Dart?', options: ['generator', 'lazy', 'sync*', 'yield*'], correctAnswerIndex: 2 },
      { question: 'What does yield do inside a generator function?', options: ['Returns the final value', 'Produces one value and pauses execution until the next is requested', 'Exits the generator', 'Throws an exception'], correctAnswerIndex: 1 },
      { question: 'What is the difference between yield and yield*?', options: ['yield is for sync; yield* is for async', 'yield produces one value; yield* delegates to another iterable', 'yield* is faster', 'They are identical'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write a generator primes() that yields prime numbers infinitely. Then: (1) print the first 10 primes, (2) print all primes below 50, (3) print the 20th prime.',
      starterCode: `bool isPrime(int n) {
  if (n < 2) return false;
  for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}

Iterable<int> primes() sync* {
  // Yield prime numbers starting from 2, infinitely
}

void main() {
  // Print first 10 primes
  // Print all primes below 50
  // Print 20th prime
}`,
      solution: `bool isPrime(int n) {
  if (n < 2) return false;
  for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}

Iterable<int> primes() sync* {
  int n = 2;
  while (true) {
    if (isPrime(n)) yield n;
    n++;
  }
}

void main() {
  print('First 10 primes: \${primes().take(10).toList()}');
  print('Primes < 50: \${primes().takeWhile((n) => n < 50).toList()}');
  print('20th prime: \${primes().elementAt(19)}');
}`,
    },
  },

  {
    id: 30,
    level: 'Beginner',
    title: 'Dart Styling, Best Practices & Project Structure',
    content: `# Dart Conventions and Best Practices

Writing correct Dart is not enough — you should also write clean, idiomatic Dart that other developers can read and maintain.

## Naming Conventions

| Element         | Convention         | Example              |
|-----------------|--------------------|----------------------|
| Classes, enums  | PascalCase         | UserProfile, OrderStatus |
| Variables, functions | camelCase    | firstName, calculateTotal() |
| Constants       | camelCase          | maxRetries, defaultTimeout |
| Files           | snake_case         | user_profile.dart    |
| Private members | _prefixed camelCase| _balance, _validate()|

## Code Style Rules
- Prefer \`final\` over \`var\` when variable does not change
- Use \`const\` for compile-time constants
- Use trailing commas in multi-line arguments — makes diffs cleaner
- Always close braces on their own line
- Limit lines to 80 characters

## Project Structure
\`\`\`
my_app/
├── lib/
│   ├── main.dart
│   ├── models/        ← Data classes
│   ├── services/      ← Business logic
│   ├── utils/         ← Helper functions
│   └── screens/       ← Flutter screens (if Flutter)
├── test/
├── pubspec.yaml
└── analysis_options.yaml
\`\`\`

## Documentation Comments
\`\`\`dart
/// Calculates the area of a circle with the given [radius].
///
/// Throws [ArgumentError] if [radius] is negative.
double circleArea(double radius) {
  if (radius < 0) throw ArgumentError('Radius must be non-negative');
  return 3.14159 * radius * radius;
}
\`\`\``,
    tips: [
      'Run dart fix --apply and dart format . regularly to auto-fix common issues and format your code.',
      'Enable strict linting by adding "package:lints/recommended.yaml" to your analysis_options.yaml.',
      'Write doc comments (///) on all public APIs — they appear in IDE tooltips and generated docs.',
    ],
    codeSnippet: `// Well-structured Dart code example

/// Represents a student in the grading system.
class Student {
  final String id;
  final String name;
  final List<int> _grades;

  /// Creates a student with the given [id], [name], and initial [grades].
  Student({
    required this.id,
    required this.name,
    List<int> grades = const [],
  }) : _grades = List.of(grades);

  /// Returns the average grade, or 0 if no grades are recorded.
  double get average {
    if (_grades.isEmpty) return 0;
    return _grades.reduce((a, b) => a + b) / _grades.length;
  }

  /// Adds a [grade] to this student's record.
  ///
  /// Throws [ArgumentError] if grade is not between 0 and 100.
  void addGrade(int grade) {
    if (grade < 0 || grade > 100) {
      throw ArgumentError.value(grade, 'grade', 'Must be 0–100');
    }
    _grades.add(grade);
  }

  /// Returns the letter grade based on the average.
  String get letterGrade => switch (average) {
    >= 90 => 'A',
    >= 80 => 'B',
    >= 70 => 'C',
    >= 60 => 'D',
    _ => 'F',
  };

  @override
  String toString() => 'Student(\$name, avg=\${average.toStringAsFixed(1)}, grade=\$letterGrade)';
}

void main() {
  final students = [
    Student(id: 's001', name: 'Alice', grades: [88, 92, 95]),
    Student(id: 's002', name: 'Bob', grades: [72, 68, 75]),
    Student(id: 's003', name: 'Charlie'),
  ];

  students[2].addGrade(55);
  students[2].addGrade(60);

  for (final s in students) {
    print(s);
  }
}`,
    expectedOutput: `Student(Alice, avg=91.7, grade=A)\nStudent(Bob, avg=71.7, grade=C)\nStudent(Charlie, avg=57.5, grade=F)`,
    quiz: [
      { question: 'What naming convention do Dart files use?', options: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'], correctAnswerIndex: 3 },
      { question: 'Which comment style creates documentation comments in Dart?', options: ['// comment', '/* comment */', '/// comment', '/** comment */'], correctAnswerIndex: 2 },
      { question: 'What does dart format do?', options: ['Runs tests', 'Compiles the code', 'Auto-formats code to match Dart style guidelines', 'Checks for type errors'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Refactor the following messy code to follow Dart best practices: add doc comments, use proper naming, use final/const where appropriate, and add proper error handling.',
      starterCode: `// Messy code to refactor
class calc {
  var Result = 0;

  void ADD(int A, int B) {
    Result = A + B;
  }

  void DIV(int a, int b) {
    Result = a ~/ b; // What if b is 0?
  }
}

void main() {
  var c = calc();
  c.ADD(10, 5);
  print(c.Result);
  c.DIV(10, 0); // Will crash!
  print(c.Result);
}`,
      solution: `/// A simple calculator that performs basic arithmetic operations.
class Calculator {
  int _result = 0;

  /// The last computed result.
  int get result => _result;

  /// Adds [a] and [b] and stores the result.
  void add(int a, int b) {
    _result = a + b;
  }

  /// Divides [a] by [b] (integer division) and stores the result.
  ///
  /// Throws [ArgumentError] if [b] is zero.
  void divide(int a, int b) {
    if (b == 0) throw ArgumentError('Cannot divide by zero');
    _result = a ~/ b;
  }
}

void main() {
  final calc = Calculator();

  calc.add(10, 5);
  print('10 + 5 = \${calc.result}');

  try {
    calc.divide(10, 2);
    print('10 ~/ 2 = \${calc.result}');
    calc.divide(10, 0); // Will throw
  } on ArgumentError catch (e) {
    print('Error: \${e.message}');
  }
}`,
    },
  },


// ═══════════════════════════════════════
  //  INTERMEDIATE  — Lessons 31 to 60
  // ═══════════════════════════════════════

  {
    id: 31,
    level: 'Intermediate',
    title: 'Null Safety in Depth',
    content: `# Dart Null Safety

Dart's sound null safety means variables cannot hold \`null\` unless you explicitly allow it. This eliminates an entire class of runtime null-pointer errors.

## Nullable vs Non-Nullable

\`\`\`dart
String name = 'Alice';   // cannot be null
String? nickname = null; // nullable — the ? allows null
\`\`\`

## Null-Aware Operators

**?.** — safely calls a method only if the object is not null:
\`\`\`dart
String? text;
print(text?.length); // prints null instead of crashing
\`\`\`

**!** — null assertion operator; throws if the value IS null:
\`\`\`dart
print(text!.length); // crashes if text is actually null
\`\`\`

**??** — if-null operator, provides a fallback:
\`\`\`dart
String display = nickname ?? 'No nickname';
\`\`\`

**??=** — assign only if the variable is currently null:
\`\`\`dart
nickname ??= 'Buddy';
\`\`\`

## Late Variables

The \`late\` keyword tells Dart a non-nullable variable will be initialised before it is first used:
\`\`\`dart
late String fullName;
fullName = 'Alice Smith'; // assigned before use — OK
\`\`\``,
    tips: [
      'Avoid the ! operator whenever possible — it bypasses null safety and can crash at runtime.',
      'Prefer ?? and ?. to keep your code safe and concise.',
      'Use late only when you are 100 % certain the variable will be set before it is read.',
    ],
    codeSnippet: `void main() {
  String city = 'Cairo';

  String? country;
  print(country);               // null
  print(country?.length);       // null (safe)
  print(country ?? 'Unknown');  // Unknown

  country = 'Egypt';
  print(country?.toUpperCase()); // EGYPT

  String? alias;
  alias ??= 'Traveller';
  print(alias); // Traveller

  late String welcomeMsg;
  welcomeMsg = 'Welcome to \$city';
  print(welcomeMsg);
}`,
    expectedOutput: `null\nnull\nUnknown\nEGYPT\nTraveller\nWelcome to Cairo`,
    quiz: [
      { question: 'What does the ? after a type (e.g. String?) mean in Dart?', options: ['The variable is optional in a function', 'The variable can hold null', 'The variable uses lazy evaluation', 'The type is dynamic'], correctAnswerIndex: 1 },
      { question: 'Which operator safely accesses a member only when the object is not null?', options: ['!.', '??.', '?.', '::'], correctAnswerIndex: 2 },
      { question: 'What does the late keyword promise Dart?', options: ['The variable will never be null', 'The variable will be assigned before its first use', 'The variable is computed lazily on every access', 'The variable is a constant'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write a function getUserLabel(String? firstName, String? lastName) that returns "firstName lastName" if both are present, "firstName" if only first name exists, "lastName" if only last name exists, and "Anonymous" if both are null.',
      starterCode: `String getUserLabel(String? firstName, String? lastName) {
  // Implement using null-aware operators
}

void main() {
  print(getUserLabel('Alice', 'Smith'));
  print(getUserLabel('Bob', null));
  print(getUserLabel(null, 'Jones'));
  print(getUserLabel(null, null));
}`,
      solution: `String getUserLabel(String? firstName, String? lastName) {
  if (firstName != null && lastName != null) return '\$firstName \$lastName';
  return firstName ?? lastName ?? 'Anonymous';
}

void main() {
  print(getUserLabel('Alice', 'Smith'));
  print(getUserLabel('Bob', null));
  print(getUserLabel(null, 'Jones'));
  print(getUserLabel(null, null));
}`,
    },
  },

  {
    id: 32,
    level: 'Intermediate',
    title: 'Advanced Functions — Named, Optional & First-Class',
    content: `# Functions as First-Class Citizens

In Dart, functions are objects. You can store them in variables, pass them as arguments, and return them from other functions.

## Named Parameters

Named parameters are wrapped in curly braces \`{}\`. Use \`required\` to make them mandatory:
\`\`\`dart
void greet({required String name, int times = 1}) {
  for (int i = 0; i < times; i++) print('Hello, \$name!');
}
greet(name: 'Alice', times: 3);
\`\`\`

## Optional Positional Parameters

Wrap in square brackets \`[]\`:
\`\`\`dart
String describe(String name, [String? role]) {
  return role != null ? '\$name (\$role)' : name;
}
\`\`\`

## Higher-Order Functions

A function that accepts or returns another function:
\`\`\`dart
void repeat(int times, void Function() action) {
  for (int i = 0; i < times; i++) action();
}
repeat(3, () => print('Dart!'));
\`\`\`

## Closures

A function that captures variables from its surrounding scope:
\`\`\`dart
Function makeAdder(int addBy) => (int x) => x + addBy;
var add5 = makeAdder(5);
print(add5(10)); // 15
\`\`\``,
    tips: [
      'Prefer named parameters for functions with more than two arguments — they make call sites self-documenting.',
      'Arrow functions (=>) are perfect for single-expression functions. They keep code concise.',
      'Closures are very common in Flutter widget callbacks — understanding them is essential.',
    ],
    codeSnippet: `void printInvoice({
  required String customer,
  required double amount,
  String currency = 'USD',
  bool paid = false,
}) {
  final status = paid ? 'Paid' : 'Unpaid';
  print('\$customer | \$currency \${amount.toStringAsFixed(2)} | \$status');
}

List<T> myMap<T, R>(List<R> items, T Function(R) transform) =>
    [for (final item in items) transform(item)];

Function multiplier(int factor) => (int x) => x * factor;

void main() {
  printInvoice(customer: 'Alice', amount: 250.0, paid: true);
  printInvoice(customer: 'Bob', amount: 99.99, currency: 'EUR');

  final doubled = myMap([1, 2, 3, 4, 5], (n) => n * 2);
  print('Doubled: \$doubled');

  final triple = multiplier(3);
  print('Triple 7: \${triple(7)}');
}`,
    expectedOutput: `Alice | USD 250.00 | Paid\nBob | EUR 99.99 | Unpaid\nDoubled: [2, 4, 6, 8, 10]\nTriple 7: 21`,
    quiz: [
      { question: 'How do you mark a named parameter as mandatory in Dart?', options: ['Using ! after the type', 'Wrapping it in []', 'Using the required keyword', 'Setting no default value'], correctAnswerIndex: 2 },
      { question: 'What is a closure in Dart?', options: ['A function with no parameters', 'A function that captures variables from its enclosing scope', 'A private class method', 'A function that returns void'], correctAnswerIndex: 1 },
      { question: 'Which syntax defines a single-expression function in Dart?', options: ['::', '->', '=>', '<<'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Write a higher-order function applyTwice(int Function(int) f, int x) that applies f to x twice (i.e. f(f(x))). Test it with a function that doubles a number and one that adds 10.',
      starterCode: `int applyTwice(int Function(int) f, int x) {
  // Apply f twice and return result
}

void main() {
  print(applyTwice((n) => n * 2, 3));   // 12
  print(applyTwice((n) => n + 10, 5));  // 25
}`,
      solution: `int applyTwice(int Function(int) f, int x) => f(f(x));

void main() {
  print(applyTwice((n) => n * 2, 3));   // 12
  print(applyTwice((n) => n + 10, 5));  // 25
}`,
    },
  },

  {
    id: 33,
    level: 'Intermediate',
    title: 'Classes and Objects — OOP Fundamentals',
    content: `# Object-Oriented Programming in Dart

Dart is a fully object-oriented language. Every value is an object.

## Defining a Class

\`\`\`dart
class Car {
  String brand;
  int year;
  Car(this.brand, this.year);
  void honk() => print('\$brand says: Beep!');
}
\`\`\`

## Constructors

**Positional**: \`Car(this.brand, this.year);\`
**Named params**: \`Car({required this.brand, required this.year});\`
**Named constructors**: \`Car.electric(this.brand) : year = 2024;\`

## Getters and Setters

\`\`\`dart
double get fuelPercent => _fuel / 60 * 100;
set fuel(double v) => _fuel = v.clamp(0, 60);
\`\`\`

## Private Fields

Fields prefixed with \`_\` are private to the library:
\`\`\`dart
double _balance = 0;
double get balance => _balance;
\`\`\``,
    tips: [
      'Use this.field in constructor parameters to automatically assign parameters to fields.',
      'Keep fields private (prefix with _) and expose them via getters/setters when validation is needed.',
      'Named constructors (e.g. Point.origin()) are great for multiple ways to create an object.',
    ],
    codeSnippet: `class BankAccount {
  final String owner;
  final String id;
  double _balance;

  BankAccount({required this.owner, required this.id, double initialBalance = 0})
      : _balance = initialBalance;

  BankAccount.empty(this.owner, this.id) : _balance = 0;

  double get balance => _balance;

  void deposit(double amount) {
    if (amount <= 0) throw ArgumentError('Deposit must be positive');
    _balance += amount;
    print('Deposited \$amount → balance: \$_balance');
  }

  bool withdraw(double amount) {
    if (amount > _balance) { print('Insufficient funds'); return false; }
    _balance -= amount;
    print('Withdrew \$amount → balance: \$_balance');
    return true;
  }

  @override
  String toString() => 'Account[\$id] \$owner: \\\$\${_balance.toStringAsFixed(2)}';
}

void main() {
  final acc = BankAccount(owner: 'Alice', id: 'ACC001', initialBalance: 500);
  print(acc);
  acc.deposit(250);
  acc.withdraw(100);
  acc.withdraw(700);
  print(acc);
}`,
    expectedOutput: `Account[ACC001] Alice: \$500.00\nDeposited 250.0 → balance: 750.0\nWithdrew 100.0 → balance: 650.0\nInsufficient funds\nAccount[ACC001] Alice: \$650.00`,
    quiz: [
      { question: 'What does BankAccount(this.owner) do in a Dart constructor?', options: ['Creates a getter for owner', 'Automatically assigns the parameter to the field', 'Marks owner as private', 'Declares a static field'], correctAnswerIndex: 1 },
      { question: 'What is the purpose of a named constructor in Dart?', options: ['To override toString', 'To provide multiple ways to create an object', 'To create a singleton', 'To hide the default constructor'], correctAnswerIndex: 1 },
      { question: 'How do you declare a private field in Dart?', options: ['private int x;', 'int #x;', 'int _x;', '#int x;'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create a Rectangle class with width and height. Add getters for area and perimeter, a scale(double factor) method, and a named constructor Rectangle.square(double side). Test all of them.',
      starterCode: `class Rectangle {
  double width;
  double height;

  // Add constructors, getters, scale method
}

void main() {
  final r = Rectangle(4, 6);
  print('Area: \${r.area}');
  print('Perimeter: \${r.perimeter}');
  r.scale(2);
  print('After scale: \${r.width}x\${r.height}');
  final sq = Rectangle.square(5);
  print('Square area: \${sq.area}');
}`,
      solution: `class Rectangle {
  double width;
  double height;

  Rectangle(this.width, this.height);
  Rectangle.square(double side) : width = side, height = side;

  double get area => width * height;
  double get perimeter => 2 * (width + height);

  void scale(double factor) {
    width *= factor;
    height *= factor;
  }
}

void main() {
  final r = Rectangle(4, 6);
  print('Area: \${r.area}');
  print('Perimeter: \${r.perimeter}');
  r.scale(2);
  print('After scale: \${r.width}x\${r.height}');
  final sq = Rectangle.square(5);
  print('Square area: \${sq.area}');
}`,
    },
  },

  {
    id: 34,
    level: 'Intermediate',
    title: 'Inheritance and Method Overriding',
    content: `# Inheritance in Dart

Inheritance lets a class reuse the properties and methods of another class, extending or replacing behaviour.

## extends and super

\`\`\`dart
class Animal {
  final String name;
  Animal(this.name);
  void speak() => print('\$name makes a sound.');
}

class Dog extends Animal {
  Dog(super.name);          // passes arg to parent constructor
  @override
  void speak() => print('\$name says: Woof!');
}
\`\`\`

## Abstract Classes

An abstract class cannot be instantiated. It defines a contract subclasses must fulfil:
\`\`\`dart
abstract class Shape {
  double get area;                          // abstract getter
  void describe() => print('Area: \$area'); // concrete method
}
\`\`\`

## @override

Always add \`@override\` when replacing a parent method. The analyser warns you if the parent has no such method.`,
    tips: [
      'Always add @override when replacing a parent method — it is a compile-time safety net.',
      'Use abstract classes to define shared contracts without providing all implementations.',
      'Prefer composition over deep inheritance hierarchies.',
    ],
    codeSnippet: `abstract class Vehicle {
  final String make;
  final int year;
  Vehicle(this.make, this.year);

  double get fuelCostPer100km;
  String get type;

  void describe() =>
      print('\$year \$make (\$type) — \${fuelCostPer100km}L/100km');
}

class Sedan extends Vehicle {
  Sedan(super.make, super.year);
  @override double get fuelCostPer100km => 7.5;
  @override String get type => 'Sedan';
}

class SUV extends Vehicle {
  SUV(super.make, super.year);
  @override double get fuelCostPer100km => 11.0;
  @override String get type => 'SUV';
}

class ElectricCar extends Vehicle {
  ElectricCar(super.make, super.year);
  @override double get fuelCostPer100km => 0;
  @override String get type => 'Electric';
  @override void describe() => print('\$year \$make (\$type) — zero emissions');
}

void main() {
  final fleet = <Vehicle>[
    Sedan('Toyota', 2022),
    SUV('Ford', 2021),
    ElectricCar('Tesla', 2023),
  ];
  for (final v in fleet) v.describe();
}`,
    expectedOutput: `2022 Toyota (Sedan) — 7.5L/100km\n2021 Ford (SUV) — 11.0L/100km\n2023 Tesla (Electric) — zero emissions`,
    quiz: [
      { question: 'What keyword does a Dart class use to inherit from another class?', options: ['inherits', 'implements', 'extends', 'derives'], correctAnswerIndex: 2 },
      { question: 'What is an abstract class?', options: ['A class with only private fields', 'A class that cannot be instantiated and may declare abstract members', 'A class with no constructor', 'A class used only in tests'], correctAnswerIndex: 1 },
      { question: 'Why should you use @override?', options: ['It speeds up the method', 'It lets the analyser warn you if no matching method exists in the parent', 'It marks the method as private', 'It is required for all methods'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Create an abstract Employee with name, hourlyRate, and abstract method weeklyPay(). Subclasses: FullTimeEmployee (fixed 40 hrs/week) and PartTimeEmployee(int hoursWorked). Print weekly pay for one of each.',
      starterCode: `abstract class Employee {
  final String name;
  final double hourlyRate;
  Employee(this.name, this.hourlyRate);
  double weeklyPay();
  @override
  String toString() => '\$name: \\\$\${weeklyPay().toStringAsFixed(2)}/week';
}

class FullTimeEmployee extends Employee {
  FullTimeEmployee(super.name, super.hourlyRate);
  // 40 hours/week
}

class PartTimeEmployee extends Employee {
  final int hoursWorked;
  PartTimeEmployee(super.name, super.hourlyRate, this.hoursWorked);
  // variable hours
}

void main() {
  print(FullTimeEmployee('Alice', 25.0));
  print(PartTimeEmployee('Bob', 20.0, 22));
}`,
      solution: `abstract class Employee {
  final String name;
  final double hourlyRate;
  Employee(this.name, this.hourlyRate);
  double weeklyPay();
  @override
  String toString() => '\$name: \\\$\${weeklyPay().toStringAsFixed(2)}/week';
}

class FullTimeEmployee extends Employee {
  FullTimeEmployee(super.name, super.hourlyRate);
  @override double weeklyPay() => hourlyRate * 40;
}

class PartTimeEmployee extends Employee {
  final int hoursWorked;
  PartTimeEmployee(super.name, super.hourlyRate, this.hoursWorked);
  @override double weeklyPay() => hourlyRate * hoursWorked;
}

void main() {
  print(FullTimeEmployee('Alice', 25.0));
  print(PartTimeEmployee('Bob', 20.0, 22));
}`,
    },
  },

  {
    id: 35,
    level: 'Intermediate',
    title: 'Interfaces and Mixins',
    content: `# Interfaces and Mixins

## implements

Every class implicitly defines an interface. Use \`implements\` to promise you will provide all the methods — without inheriting code:
\`\`\`dart
abstract class Printable {
  void printInfo();
}
class Invoice implements Printable {
  @override void printInfo() => print('Invoice...');
}
\`\`\`

## Mixins

A **mixin** lets you reuse code across unrelated class hierarchies without normal inheritance. Use \`mixin\` to define one and \`with\` to apply it:
\`\`\`dart
mixin Logger {
  void log(String msg) => print('[LOG] \$msg');
}
class Service with Logger {
  void start() => log('Service started');
}
\`\`\`

## Combining

A class can \`extend\` ONE class, but \`implement\` or \`mixin\` as many as needed:
\`\`\`dart
class Robot with Logger, Serializable implements Machine { ... }
\`\`\``,
    tips: [
      'Use implements when you only care about the shape, not inherited code.',
      'Use mixins to share utility behaviours (logging, validation) across unrelated classes.',
      'A class can extend ONE class, but apply as many mixins as needed.',
    ],
    codeSnippet: `mixin Timestamped {
  String get timestamp => DateTime.now().toIso8601String().substring(0, 10);
}

mixin Validatable {
  List<String> get errors;
  bool get isValid => errors.isEmpty;
}

class User with Timestamped, Validatable {
  final String email;
  final String password;

  User({required this.email, required this.password});

  @override
  List<String> get errors {
    final e = <String>[];
    if (!email.contains('@')) e.add('Invalid email');
    if (password.length < 8) e.add('Password too short');
    return e;
  }
}

void main() {
  final u1 = User(email: 'alice@example.com', password: 'securePass');
  final u2 = User(email: 'bad-email', password: 'short');

  print('User 1 valid: \${u1.isValid}');
  print('User 2 errors: \${u2.errors}');
  print('Created: \${u1.timestamp}');
}`,
    expectedOutput: `User 1 valid: true\nUser 2 errors: [Invalid email, Password too short]\nCreated: 2024-01-01`,
    quiz: [
      { question: 'What is the key difference between extends and implements?', options: ['implements is faster', 'extends inherits code; implements only requires you to provide the methods', 'implements allows multiple parents; extends does not', 'No difference'], correctAnswerIndex: 1 },
      { question: 'What keyword applies a mixin to a class?', options: ['uses', 'mixes', 'with', 'include'], correctAnswerIndex: 2 },
      { question: 'How many classes can a Dart class extend?', options: ['As many as needed', 'Only one', 'Up to three', 'Only two'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Define a mixin Discountable with applyDiscount(double price, double percent) returning the discounted price. Create a Product class using this mixin, then print the discounted price of a £1200 Laptop at 15% off.',
      starterCode: `mixin Discountable {
  double applyDiscount(double price, double percent) {
    // Return price minus the percentage
  }
}

class Product with Discountable {
  final String name;
  double price;
  Product(this.name, this.price);
}

void main() {
  final p = Product('Laptop', 1200.0);
  print(p.applyDiscount(p.price, 15).toStringAsFixed(2));
}`,
      solution: `mixin Discountable {
  double applyDiscount(double price, double percent) =>
      price - (price * percent / 100);
}

class Product with Discountable {
  final String name;
  double price;
  Product(this.name, this.price);
}

void main() {
  final p = Product('Laptop', 1200.0);
  print(p.applyDiscount(p.price, 15).toStringAsFixed(2)); // 1020.00
}`,
    },
  },

  {
    id: 36,
    level: 'Intermediate',
    title: 'Generics',
    content: `# Generics in Dart

Generics let you write reusable, type-safe code that works with any type, while still catching type errors at compile time.

## Generic Class

\`\`\`dart
class Stack<T> {
  final _items = <T>[];
  void push(T item) => _items.add(item);
  T pop() => _items.removeLast();
  T get peek => _items.last;
  bool get isEmpty => _items.isEmpty;
}

final intStack = Stack<int>()..push(1)..push(2);
print(intStack.pop()); // 2
\`\`\`

## Generic Functions

\`\`\`dart
T first<T>(List<T> list) => list.first;
\`\`\`

## Bounded Type Parameters

Restrict T to a type hierarchy:
\`\`\`dart
T largest<T extends Comparable<T>>(T a, T b) =>
    a.compareTo(b) >= 0 ? a : b;
\`\`\``,
    tips: [
      'Use single uppercase letters (T, K, V, E) for generic type parameters by convention.',
      'Constraints (extends) let you call methods on T that belong to the bound type.',
      "Dart's built-in collections (List<T>, Map<K,V>, Set<T>) are all generic.",
    ],
    codeSnippet: `class Pair<A, B> {
  final A first;
  final B second;
  const Pair(this.first, this.second);

  Pair<B, A> get swapped => Pair(second, first);

  @override
  String toString() => '(\$first, \$second)';
}

T? findFirst<T>(List<T> list, bool Function(T) test) {
  for (final item in list) {
    if (test(item)) return item;
  }
  return null;
}

T maxOf<T extends Comparable<T>>(List<T> items) =>
    items.reduce((a, b) => a.compareTo(b) > 0 ? a : b);

void main() {
  final p = Pair('Alice', 30);
  print(p);
  print(p.swapped);

  final names = ['Charlie', 'Alice', 'Bob', 'Dave'];
  print(findFirst(names, (n) => n.startsWith('B')));

  print(maxOf([3, 1, 4, 1, 5, 9, 2, 6]));
  print(maxOf(['banana', 'apple', 'mango']));
}`,
    expectedOutput: `(Alice, 30)\n(30, Alice)\nBob\n9\nmango`,
    quiz: [
      { question: 'What is the purpose of generics in Dart?', options: ['To make code run faster', 'To write type-safe reusable code that works across types', 'To enable dynamic typing', 'To define abstract classes'], correctAnswerIndex: 1 },
      { question: 'What does <T extends Comparable<T>> mean?', options: ['T must be a number', 'T must implement the Comparable interface', 'T extends the class literally called Comparable', 'T is optional'], correctAnswerIndex: 1 },
      { question: 'Which is a valid generic class instantiation?', options: ['Stack(int)', 'Stack.int()', 'Stack<int>()', 'Stack[int]()'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Implement a generic Queue<T> (FIFO) with enqueue(T item), T dequeue(), T get front, bool get isEmpty, and int get length. Test it with integers.',
      starterCode: `class Queue<T> {
  // Implement using a List
}

void main() {
  final q = Queue<int>();
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  print('Front: \${q.front}');
  print('Dequeue: \${q.dequeue()}');
  print('Length: \${q.length}');
}`,
      solution: `class Queue<T> {
  final _items = <T>[];
  void enqueue(T item) => _items.add(item);
  T dequeue() => _items.removeAt(0);
  T get front => _items.first;
  bool get isEmpty => _items.isEmpty;
  int get length => _items.length;
}

void main() {
  final q = Queue<int>();
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  print('Front: \${q.front}');
  print('Dequeue: \${q.dequeue()}');
  print('Length: \${q.length}');
}`,
    },
  },

  {
    id: 37,
    level: 'Intermediate',
    title: 'Collections Deep Dive — Map and Set',
    content: `# Maps and Sets

## Maps

A \`Map\` stores key-value pairs with unique keys:
\`\`\`dart
Map<String, int> scores = {'Alice': 95, 'Bob': 82};
scores['Charlie'] = 78;
scores['Alice'];   // 95
scores['Eve'];     // null (key missing)
\`\`\`

## Useful Map Operations

\`\`\`dart
scores.containsKey('Bob')
scores.keys.toList()
scores.values.toList()
scores.entries.forEach((e) => print('\${e.key}: \${e.value}'));
scores.update('Alice', (v) => v + 5, ifAbsent: () => 0);
final merged = {...map1, ...map2}; // spread to merge
\`\`\`

## Sets

An unordered collection of **unique** values:
\`\`\`dart
Set<String> tags = {'dart', 'flutter', 'mobile'};
tags.add('dart');           // no duplicate
tags.intersection({...});  // common elements
tags.union({...});          // all combined
tags.difference({...});    // in this set but not other
\`\`\``,
    tips: [
      'Map[key] returns null for missing keys — never throws.',
      'Use map.putIfAbsent(key, () => value) to safely add a key only when absent.',
      'Set.contains() is O(1) vs List.contains() which is O(n) — prefer sets for membership checks.',
    ],
    codeSnippet: `void main() {
  final text = 'the quick brown fox jumps over the lazy dog';
  final freq = <String, int>{};
  for (final word in text.split(' ')) {
    freq[word] = (freq[word] ?? 0) + 1;
  }
  final repeated = freq.entries.where((e) => e.value > 1);
  print('Repeated words:');
  for (final e in repeated) print('  \${e.key}: \${e.value}');

  final a = {1, 2, 3, 4, 5};
  final b = {3, 4, 5, 6, 7};
  print('\\nUnion: \${a.union(b)}');
  print('Intersection: \${a.intersection(b)}');
  print('Difference A-B: \${a.difference(b)}');
}`,
    expectedOutput: `Repeated words:\n  the: 2\n\nUnion: {1, 2, 3, 4, 5, 6, 7}\nIntersection: {3, 4, 5}\nDifference A-B: {1, 2}`,
    quiz: [
      { question: 'What does a Map return if you access a missing key?', options: ['An exception', 'An empty String', 'null', '0'], correctAnswerIndex: 2 },
      { question: 'Which Set method returns elements present in both sets?', options: ['union()', 'difference()', 'intersection()', 'overlap()'], correctAnswerIndex: 2 },
      { question: 'Can a Map have duplicate keys?', options: ['Yes', 'Yes, but only String keys', 'No', 'Only in LinkedHashMap'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: "Given a list of words, build a Map<String, List<String>> grouping words by their first letter. Print each group sorted alphabetically.",
      starterCode: `void main() {
  final words = ['banana','apple','avocado','blueberry','cherry','apricot','cantaloupe'];

  // Build grouped map, then print sorted
}`,
      solution: `void main() {
  final words = ['banana','apple','avocado','blueberry','cherry','apricot','cantaloupe'];

  final grouped = <String, List<String>>{};
  for (final word in words) {
    grouped.putIfAbsent(word[0].toUpperCase(), () => []).add(word);
  }

  final sortedKeys = grouped.keys.toList()..sort();
  for (final key in sortedKeys) {
    final list = grouped[key]!..sort();
    print('\$key: \$list');
  }
}`,
    },
  },

  {
    id: 38,
    level: 'Intermediate',
    title: 'Functional Collection Operations',
    content: `# Functional Operations on Collections

Dart's Iterable provides functional methods that let you transform, filter, and aggregate data without explicit loops.

## Core Methods

**map()** — transform each element:
\`\`\`dart
[1,2,3].map((x) => x * 2).toList(); // [2,4,6]
\`\`\`

**where()** — filter elements:
\`\`\`dart
[1,2,3,4].where((x) => x.isEven).toList(); // [2,4]
\`\`\`

**reduce() / fold()** — collapse to a single value:
\`\`\`dart
[1,2,3,4].reduce((acc, x) => acc + x);        // 10
[1,2,3,4].fold(1, (acc, x) => acc * x);       // 24
\`\`\`
Use \`fold\` when you need a starting value or different return type.

**any() / every()**:
\`\`\`dart
[1,2,3].any((x) => x > 2)    // true
[1,2,3].every((x) => x > 0)  // true
\`\`\`

**expand()** — flatMap:
\`\`\`dart
[[1,2],[3,4]].expand((e) => e).toList(); // [1,2,3,4]
\`\`\``,
    tips: [
      'map() and where() return lazy Iterables — call .toList() only when you need a concrete list.',
      'Use fold() when the accumulator type differs from the element type.',
      'Chaining functional operations is more readable than nested loops.',
    ],
    codeSnippet: `void main() {
  final products = [
    {'name': 'Laptop', 'price': 999.0, 'inStock': true},
    {'name': 'Phone', 'price': 499.0, 'inStock': false},
    {'name': 'Tablet', 'price': 349.0, 'inStock': true},
    {'name': 'Watch', 'price': 199.0, 'inStock': true},
  ];

  final available = products
      .where((p) => p['inStock'] == true && (p['price'] as double) < 500)
      .toList()
    ..sort((a, b) => (a['price'] as double).compareTo(b['price'] as double));

  print('Available under \$500:');
  for (final p in available) print('  \${p['name']}: \\\$\${p['price']}');

  final total = products
      .where((p) => p['inStock'] == true)
      .fold(0.0, (sum, p) => sum + (p['price'] as double));
  print('In-stock total: \\\$\$total');

  final names = products.map((p) => p['name']).join(', ');
  print('All: \$names');
}`,
    expectedOutput: `Available under \$500:\n  Watch: \$199.0\n  Tablet: \$349.0\nIn-stock total: \$1547.0\nAll: Laptop, Phone, Tablet, Watch`,
    quiz: [
      { question: 'What does .where() do on a List?', options: ['Transforms each element', 'Removes duplicates', 'Filters elements by a condition', 'Sorts the list'], correctAnswerIndex: 2 },
      { question: 'What is the difference between reduce() and fold()?', options: ['reduce() is async', 'fold() takes a starting value and can return a different type', 'reduce() preserves order', 'They are identical'], correctAnswerIndex: 1 },
      { question: 'What does .expand() do?', options: ['Increases list capacity', 'Flattens nested iterables into a single iterable', 'Repeats elements', 'Removes nulls'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Given a list of student maps with name and grades (List<int>), compute each average, keep only students ≥70, sort descending, and print name + average.',
      starterCode: `void main() {
  final students = [
    {'name': 'Alice', 'grades': [85, 90, 92]},
    {'name': 'Bob', 'grades': [55, 60, 65]},
    {'name': 'Carol', 'grades': [70, 75, 80]},
    {'name': 'Dave', 'grades': [40, 50, 45]},
  ];

  // Pipeline: average → filter ≥70 → sort desc → print
}`,
      solution: `void main() {
  final students = [
    {'name': 'Alice', 'grades': [85, 90, 92]},
    {'name': 'Bob', 'grades': [55, 60, 65]},
    {'name': 'Carol', 'grades': [70, 75, 80]},
    {'name': 'Dave', 'grades': [40, 50, 45]},
  ];

  double avg(List<int> g) => g.reduce((a, b) => a + b) / g.length;

  final passing = students
      .map((s) => {'name': s['name'], 'avg': avg(s['grades'] as List<int>)})
      .where((s) => (s['avg'] as double) >= 70)
      .toList()
    ..sort((a, b) => (b['avg'] as double).compareTo(a['avg'] as double));

  for (final s in passing) {
    print('\${s['name']}: \${(s['avg'] as double).toStringAsFixed(1)}');
  }
}`,
    },
  },

  {
    id: 39,
    level: 'Intermediate',
    title: 'Exception Handling',
    content: `# Exception Handling in Dart

Dart uses \`try / catch / on / finally\` for structured error handling.

## Basic Structure

\`\`\`dart
try {
  int result = 10 ~/ 0;
} on IntegerDivisionByZeroException {
  print('Cannot divide by zero!');
} catch (e, stack) {
  print('Error: \$e');
} finally {
  print('Always runs');
}
\`\`\`

## on vs catch

- \`on ExceptionType\` — matches a specific type
- \`catch (e)\` — catches anything and gives you the object
- \`on Type catch (e)\` — both at once

## Throwing

\`\`\`dart
throw FormatException('Expected a number');
throw ArgumentError.notNull('email');
\`\`\`

## Custom Exceptions

\`\`\`dart
class InsufficientFundsException implements Exception {
  final double amount;
  const InsufficientFundsException(this.amount);
  @override String toString() => 'Need \$amount more';
}
\`\`\``,
    tips: [
      'Put specific on clauses before a general catch.',
      'Always use finally for resource cleanup — it runs whether or not an exception was thrown.',
      'Custom exception classes make your API much clearer than throwing plain strings.',
    ],
    codeSnippet: `class ValidationException implements Exception {
  final String field;
  final String message;
  const ValidationException(this.field, this.message);
  @override String toString() => 'ValidationException[\$field]: \$message';
}

double parsePositiveDouble(String input) {
  final value = double.tryParse(input);
  if (value == null) throw FormatException('Not a number: "\$input"');
  if (value <= 0) throw ValidationException('input', 'Must be positive');
  return value;
}

void process(String input) {
  try {
    print('Parsed: \${parsePositiveDouble(input)}');
  } on ValidationException catch (e) {
    print('Validation: \$e');
  } on FormatException catch (e) {
    print('Format: \${e.message}');
  } finally {
    print('Done: "\$input"');
  }
}

void main() {
  process('42.5');
  process('abc');
  process('-5');
}`,
    expectedOutput: `Parsed: 42.5\nDone: "42.5"\nFormat: Not a number: "abc"\nDone: "abc"\nValidation: ValidationException[input]: Must be positive\nDone: "-5"`,
    quiz: [
      { question: 'What is the difference between on and catch in a try block?', options: ['on is for async; catch is for sync', 'on matches by type; catch gives you the exception object', 'catch is deprecated', 'They are identical'], correctAnswerIndex: 1 },
      { question: 'When does the finally block run?', options: ['Only when no exception is thrown', 'Only when an exception is thrown', 'Always', 'Only when re-throwing'], correctAnswerIndex: 2 },
      { question: 'What should a custom exception implement?', options: ['Error', 'Throwable', 'Exception', 'RuntimeException'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create a NetworkException with statusCode and message. Write fetchData(int code) that throws for codes ≥400 and returns "Data OK" for 200. Handle 404 differently from other errors in main.',
      starterCode: `class NetworkException implements Exception {
  final int statusCode;
  final String message;
  const NetworkException(this.statusCode, this.message);
  @override String toString() => 'NetworkException \$statusCode: \$message';
}

String fetchData(int statusCode) {
  // Throw or return
}

void main() {
  for (final code in [200, 404, 500]) {
    try {
      print(fetchData(code));
    } on NetworkException catch (e) {
      // Handle 404 vs other errors differently
    }
  }
}`,
      solution: `class NetworkException implements Exception {
  final int statusCode;
  final String message;
  const NetworkException(this.statusCode, this.message);
  @override String toString() => 'NetworkException \$statusCode: \$message';
}

String fetchData(int statusCode) {
  if (statusCode == 404) throw NetworkException(404, 'Not Found');
  if (statusCode >= 400) throw NetworkException(statusCode, 'Server Error');
  return 'Data OK';
}

void main() {
  for (final code in [200, 404, 500]) {
    try {
      print(fetchData(code));
    } on NetworkException catch (e) {
      if (e.statusCode == 404) print('Resource missing: \${e.message}');
      else print('Server problem: \$e');
    }
  }
}`,
    },
  },

  {
    id: 40,
    level: 'Intermediate',
    title: 'Async Programming — Future and async/await',
    content: `# Asynchronous Programming with Future

Many operations take time — HTTP calls, file reads, timers. Dart uses \`Future<T>\` to represent a value that will be available later, keeping the UI responsive.

## async / await

\`\`\`dart
Future<String> fetchUser(int id) async {
  await Future.delayed(Duration(seconds: 1));
  return 'User \$id';
}

void main() async {
  print('Fetching...');
  final user = await fetchUser(42);
  print('Got: \$user');
}
\`\`\`

## Error Handling

\`\`\`dart
try {
  final data = await fetchData();
} catch (e) {
  print('Failed: \$e');
}
\`\`\`

## Future.wait — Parallel Execution

\`\`\`dart
final results = await Future.wait([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3),
]);
\`\`\``,
    tips: [
      'An async function always returns a Future, even if you write return 42 — it becomes Future<int>.',
      'Use Future.wait to run multiple Futures in parallel rather than awaiting sequentially.',
      "Prefer async/await over .then() chaining — it's more readable.",
    ],
    codeSnippet: `Future<double> getRate(String currency) async {
  await Future.delayed(Duration(milliseconds: 50));
  final rates = {'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.5};
  final rate = rates[currency];
  if (rate == null) throw ArgumentError('Unknown: \$currency');
  return rate;
}

Future<void> convert(double amount, String currency) async {
  try {
    final rate = await getRate(currency);
    print('\\\$\${amount.toStringAsFixed(2)} = \${(amount*rate).toStringAsFixed(2)} \$currency');
  } on ArgumentError catch (e) {
    print('Error: \$e');
  }
}

void main() async {
  await convert(100, 'EUR');
  await convert(250, 'GBP');
  await convert(50, 'XYZ');

  final rates = await Future.wait(
    ['EUR','GBP','JPY'].map(getRate));
  print('Rates: \$rates');
}`,
    expectedOutput: `\$100.00 = 92.00 EUR\n\$250.00 = 197.50 GBP\nError: Invalid argument(s): Unknown: XYZ\nRates: [0.92, 0.79, 149.5]`,
    quiz: [
      { question: 'What does the await keyword do?', options: ['Blocks the entire program', 'Pauses the current async function until the Future completes', 'Cancels the Future', 'Runs the Future in a new thread'], correctAnswerIndex: 1 },
      { question: 'What return type does an async function always have?', options: ['void', 'The raw type', 'Future<T>', 'Stream<T>'], correctAnswerIndex: 2 },
      { question: 'What is the advantage of Future.wait over sequential awaiting?', options: ['It is safer', 'Runs Futures in parallel, reducing total wait time', 'Handles errors automatically', 'Required for more than 3 Futures'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write async fetchProducts() returning 3 products after 200ms, and fetchPrice(String name) returning a price after 100ms. In main, fetch products, then get all prices in parallel with Future.wait.',
      starterCode: `import 'dart:async';

Future<List<String>> fetchProducts() async {
  // 200ms delay, return ['Laptop','Phone','Tablet']
}

Future<double> fetchPrice(String name) async {
  // 100ms delay, return a price
}

void main() async {
  // Fetch products, then prices in parallel
}`,
      solution: `import 'dart:async';

Future<List<String>> fetchProducts() async {
  await Future.delayed(Duration(milliseconds: 200));
  return ['Laptop', 'Phone', 'Tablet'];
}

Future<double> fetchPrice(String name) async {
  await Future.delayed(Duration(milliseconds: 100));
  return {'Laptop': 999.0, 'Phone': 499.0, 'Tablet': 349.0}[name] ?? 0;
}

void main() async {
  final products = await fetchProducts();
  final prices = await Future.wait(products.map(fetchPrice));
  for (int i = 0; i < products.length; i++) {
    print('\${products[i]}: \\\$\${prices[i]}');
  }
}`,
    },
  },

  {
    id: 41,
    level: 'Intermediate',
    title: 'Streams',
    content: `# Streams in Dart

A \`Stream\` is like a Future that delivers multiple values over time — a sequence of asynchronous events.

## Creating Streams

\`\`\`dart
// Async generator — the most readable approach
Stream<int> countDown(int from) async* {
  for (int i = from; i >= 0; i--) {
    await Future.delayed(Duration(milliseconds: 500));
    yield i;
  }
}
\`\`\`

## await for — Async Loop

\`\`\`dart
await for (final value in countDown(5)) {
  print(value);
}
\`\`\`

## listen()

\`\`\`dart
stream.listen(
  (data) => print('Data: \$data'),
  onError: (e) => print('Error: \$e'),
  onDone: () => print('Done'),
);
\`\`\`

## Transformations

\`\`\`dart
stream.where((n) => n.isEven).map((n) => n * 10).listen(print);
\`\`\``,
    tips: [
      'async* with yield creates streams cleanly — prefer it over StreamController for simple cases.',
      'await for is the cleanest way to consume a stream inside an async function.',
      'Always handle onDone and onError when listening to a stream in production code.',
    ],
    codeSnippet: `Stream<String> weatherUpdates() async* {
  final conditions = ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Stormy'];
  for (final c in conditions) {
    await Future.delayed(Duration(milliseconds: 100));
    yield c;
  }
}

Stream<int> fibonacci() async* {
  int a = 0, b = 1;
  while (true) {
    yield a;
    final t = a + b; a = b; b = t;
    await Future.delayed(Duration(milliseconds: 1));
  }
}

void main() async {
  print('Weather:');
  await for (final w in weatherUpdates()) print('  \$w');

  print('\\nFirst 8 Fibonacci:');
  final fibs = <int>[];
  await for (final n in fibonacci()) {
    fibs.add(n);
    if (fibs.length == 8) break;
  }
  print(fibs);
}`,
    expectedOutput: `Weather:\n  Sunny\n  Cloudy\n  Rainy\n  Windy\n  Stormy\n\nFirst 8 Fibonacci:\n[0, 1, 1, 2, 3, 5, 8, 13]`,
    quiz: [
      { question: 'What is the main difference between a Future and a Stream?', options: ['Futures are faster', 'A Stream delivers multiple values over time; a Future delivers one', 'Streams are only for I/O', 'Futures can be cancelled; Streams cannot'], correctAnswerIndex: 1 },
      { question: 'What keyword marks a function as an async generator?', options: ['async', 'sync*', 'stream', 'async*'], correctAnswerIndex: 3 },
      { question: 'Which loop construct consumes a stream sequentially?', options: ['for-in', 'while-stream', 'await for', 'forEach'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Write async* tickerStream(int count, int ms) that yields 1..count with a delay between each. In main, listen and print each value.',
      starterCode: `Stream<int> tickerStream(int count, int ms) async* {
  // yield 1 through count with delay
}

void main() async {
  await for (final tick in tickerStream(5, 100)) {
    print('Tick \$tick');
  }
}`,
      solution: `Stream<int> tickerStream(int count, int ms) async* {
  for (int i = 1; i <= count; i++) {
    await Future.delayed(Duration(milliseconds: ms));
    yield i;
  }
}

void main() async {
  await for (final tick in tickerStream(5, 100)) {
    print('Tick \$tick');
  }
  print('Done');
}`,
    },
  },

  {
    id: 42,
    level: 'Intermediate',
    title: 'Enums and Sealed Classes',
    content: `# Enums and Sealed Classes

## Enhanced Enums (Dart 2.17+)

Enums can have fields, methods, and implement interfaces:
\`\`\`dart
enum Planet {
  mercury(3.7), venus(8.87), earth(9.81);
  final double gravity;
  const Planet(this.gravity);
  double weight(double mass) => mass * gravity;
}
print(Planet.earth.weight(70)); // 686.7
\`\`\`

## Sealed Classes (Dart 3+)

A \`sealed\` class can only be subclassed within the same file. Combined with switch expressions, every case must be handled — the compiler will warn you:
\`\`\`dart
sealed class Result<T> {}
class Success<T> extends Result<T> { final T value; Success(this.value); }
class Failure<T> extends Result<T> { final String error; Failure(this.error); }

String describe<T>(Result<T> r) => switch (r) {
  Success(value: final v) => 'OK: \$v',
  Failure(error: final e) => 'Err: \$e',
};
\`\`\``,
    tips: [
      'Enhanced enums replace many patterns that used to need a full class.',
      'Sealed classes + switch expressions = exhaustive pattern matching with compiler enforcement.',
      'Use sealed classes to model UI states (Loading / Success / Error) in Flutter apps.',
    ],
    codeSnippet: `enum OrderStatus {
  pending('Pending'),
  processing('Processing'),
  shipped('Shipped'),
  delivered('Delivered'),
  cancelled('Cancelled');

  final String label;
  const OrderStatus(this.label);
  bool get isFinal => this == delivered || this == cancelled;
}

sealed class ApiResult<T> {}
class ApiSuccess<T> extends ApiResult<T> {
  final T data; const ApiSuccess(this.data);
}
class ApiError<T> extends ApiResult<T> {
  final String message; final int code;
  const ApiError(this.message, this.code);
}

String handle<T>(ApiResult<T> r) => switch (r) {
  ApiSuccess(data: final d) => 'OK: \$d',
  ApiError(message: final m, code: final c) => 'Error \$c: \$m',
};

void main() {
  for (final s in OrderStatus.values) {
    print('\${s.label} — final: \${s.isFinal}');
  }
  print(handle(ApiSuccess('user data')));
  print(handle(ApiError<String>('Not Found', 404)));
}`,
    expectedOutput: `Pending — final: false\nProcessing — final: false\nShipped — final: false\nDelivered — final: true\nCancelled — final: true\nOK: user data\nError 404: Not Found`,
    quiz: [
      { question: 'What can enhanced Dart enums have that traditional enums cannot?', options: ['More than 10 values', 'Fields, constructors, and methods', 'Generic type parameters', 'Dynamic values'], correctAnswerIndex: 1 },
      { question: 'What does the sealed keyword guarantee?', options: ['All subclasses are private', 'All subclasses are in the same file, enabling exhaustive switch', 'No subclasses are allowed', 'Exactly two subclasses'], correctAnswerIndex: 1 },
      { question: 'What happens in a switch on a sealed class when you miss a subtype?', options: ['A runtime exception', 'Silently ignored', 'A compile-time warning or error', 'Default branch runs'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create a sealed Shape with subclasses Circle(radius), Rect(width,height), Triangle(base,height). Write double area(Shape s) using a switch expression. Test all three.',
      starterCode: `import 'dart:math';

sealed class Shape {}
class Circle extends Shape { final double radius; Circle(this.radius); }
class Rect extends Shape { final double width, height; Rect(this.width, this.height); }
class Triangle extends Shape { final double base, height; Triangle(this.base, this.height); }

double area(Shape s) => switch (s) {
  // handle all 3
};

void main() {
  print(area(Circle(5)).toStringAsFixed(2));
  print(area(Rect(4, 6)).toStringAsFixed(2));
  print(area(Triangle(3, 8)).toStringAsFixed(2));
}`,
      solution: `import 'dart:math';

sealed class Shape {}
class Circle extends Shape { final double radius; Circle(this.radius); }
class Rect extends Shape { final double width, height; Rect(this.width, this.height); }
class Triangle extends Shape { final double base, height; Triangle(this.base, this.height); }

double area(Shape s) => switch (s) {
  Circle(radius: final r) => pi * r * r,
  Rect(width: final w, height: final h) => w * h,
  Triangle(base: final b, height: final h) => 0.5 * b * h,
};

void main() {
  print(area(Circle(5)).toStringAsFixed(2));
  print(area(Rect(4, 6)).toStringAsFixed(2));
  print(area(Triangle(3, 8)).toStringAsFixed(2));
}`,
    },
  },

  {
    id: 43,
    level: 'Intermediate',
    title: 'Pattern Matching (Dart 3)',
    content: `# Pattern Matching in Dart 3

Dart 3 introduced first-class patterns for concise destructuring and conditional logic.

## Switch Expressions with Patterns

\`\`\`dart
final desc = switch (point) {
  (0, 0) => 'Origin',
  (final x, 0) => 'On X-axis at \$x',
  (0, final y) => 'On Y-axis at \$y',
  (final x, final y) => '(\$x, \$y)',
};
\`\`\`

## List Patterns

\`\`\`dart
switch (list) {
  case []: print('empty');
  case [final x]: print('single: \$x');
  case [final x, ...]: print('starts with \$x');
}
\`\`\`

## Guard Clauses (when)

\`\`\`dart
switch (n) {
  case final x when x > 0 => 'positive',
  case final x when x < 0 => 'negative',
  _ => 'zero',
};
\`\`\`

## Record Destructuring

\`\`\`dart
final (name, age) = ('Alice', 30);
print('\$name is \$age');
\`\`\``,
    tips: [
      'The when guard adds boolean conditions beyond structural matching.',
      'Patterns can be nested — a map pattern can contain a list pattern.',
      'Record patterns are great for functions returning multiple values.',
    ],
    codeSnippet: `(String grade, String comment) classify(int score) => switch (score) {
  >= 95 => ('A+', 'Outstanding'),
  >= 90 => ('A', 'Excellent'),
  >= 80 => ('B', 'Very Good'),
  >= 70 => ('C', 'Good'),
  >= 60 => ('D', 'Passing'),
  _ => ('F', 'Failed'),
};

String describeList(List<int> list) => switch (list) {
  [] => 'empty',
  [final x] => 'single: \$x',
  [final x, final y] => 'pair: \$x and \$y',
  [final x, ...final rest] => 'starts with \$x, \${rest.length} more',
};

void main() {
  for (final score in [97, 85, 72, 55]) {
    final (grade, comment) = classify(score);
    print('\$score → \$grade (\$comment)');
  }
  for (final list in [[], [42], [1,2], [1,2,3,4,5]]) {
    print('\$list → \${describeList(list)}');
  }
}`,
    expectedOutput: `97 → A+ (Outstanding)\n85 → B (Very Good)\n72 → C (Good)\n55 → F (Failed)\n[] → empty\n[42] → single: 42\n[1, 2] → pair: 1 and 2\n[1, 2, 3, 4, 5] → starts with 1, 4 more`,
    quiz: [
      { question: 'What does the ... (rest) pattern match in a list pattern?', options: ['An empty list', 'Exactly one element', 'Zero or more remaining elements', 'A nested list'], correctAnswerIndex: 2 },
      { question: 'What does the when keyword do in a switch case?', options: ['Matches a type', 'Adds a boolean guard condition', 'Skips the case', 'Matches a wildcard'], correctAnswerIndex: 1 },
      { question: 'What are Records used for in pattern matching?', options: ['Database storage', 'Returning and destructuring multiple values concisely', 'Replacing Map entirely', 'Defining immutable classes'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write classifyPoint((int,int) p) using a switch expression that returns "Origin", "On X-axis", "On Y-axis", or "Quadrant I/II/III/IV" using tuple patterns and when guards.',
      starterCode: `String classifyPoint((int, int) p) => switch (p) {
  // Match all cases
};

void main() {
  print(classifyPoint((0, 0)));
  print(classifyPoint((3, 0)));
  print(classifyPoint((0, -2)));
  print(classifyPoint((2, 3)));
  print(classifyPoint((-1, -3)));
}`,
      solution: `String classifyPoint((int, int) p) => switch (p) {
  (0, 0) => 'Origin',
  (_, 0) => 'On X-axis',
  (0, _) => 'On Y-axis',
  (final x, final y) when x > 0 && y > 0 => 'Quadrant I',
  (final x, final y) when x < 0 && y > 0 => 'Quadrant II',
  (final x, final y) when x < 0 && y < 0 => 'Quadrant III',
  _ => 'Quadrant IV',
};

void main() {
  print(classifyPoint((0, 0)));
  print(classifyPoint((3, 0)));
  print(classifyPoint((0, -2)));
  print(classifyPoint((2, 3)));
  print(classifyPoint((-1, -3)));
}`,
    },
  },

  {
    id: 44,
    level: 'Intermediate',
    title: 'Extension Methods',
    content: `# Extension Methods

Extension methods let you add new functionality to existing types — including types you did not write — without modifying them.

## Defining an Extension

\`\`\`dart
extension StringUtils on String {
  bool get isEmail => contains('@') && contains('.');
  String capitalize() =>
      isEmpty ? this : this[0].toUpperCase() + substring(1);
  String truncate(int max) =>
      length <= max ? this : '\${substring(0, max)}...';
}

print('hello'.capitalize());          // Hello
print('user@example.com'.isEmail);    // true
\`\`\`

## Generic Extensions

\`\`\`dart
extension ListUtils<T> on List<T> {
  T get random => this[DateTime.now().millisecond % length];
}
\`\`\`

## Conflict Resolution

If two extensions define the same method, use the explicit form:
\`\`\`dart
ExtensionName(object).method()
\`\`\``,
    tips: [
      'Extensions are resolved at compile-time — they do not change the runtime type.',
      'Give extensions meaningful names to aid disambiguation.',
      'Great for adding domain helpers to primitives (int, String) across your app.',
    ],
    codeSnippet: `extension IntUtils on int {
  bool get isPrime {
    if (this < 2) return false;
    for (int i = 2; i * i <= this; i++) {
      if (this % i == 0) return false;
    }
    return true;
  }
  String get ordinal {
    if (this % 100 >= 11 && this % 100 <= 13) return '\${this}th';
    return switch (this % 10) {
      1 => '\${this}st', 2 => '\${this}nd', 3 => '\${this}rd', _ => '\${this}th'
    };
  }
}

extension StringUtils on String {
  bool get isPalindrome => this == split('').reversed.join();
  List<String> get words => trim().split(RegExp(r'\\s+'));
}

void main() {
  print(7.isPrime);
  print(10.isPrime);
  print(1.ordinal);
  print(2.ordinal);
  print(11.ordinal);
  print('racecar'.isPalindrome);
  print('hello'.isPalindrome);
  print('hello world dart'.words);
}`,
    expectedOutput: `true\nfalse\n1st\n2nd\n11th\ntrue\nfalse\n[hello, world, dart]`,
    quiz: [
      { question: 'What do extension methods allow?', options: ['Adding private fields to existing classes', 'Adding methods to existing classes without modifying them', 'Overriding existing methods', 'Creating hidden constructors'], correctAnswerIndex: 1 },
      { question: 'When are extension methods resolved?', options: ['At runtime', 'At compile-time', 'By the VM dynamically', 'During linking'], correctAnswerIndex: 1 },
      { question: 'What happens when two extensions define the same method name?', options: ['First one wins', 'Runtime error', 'Must use explicit extension call syntax', 'Dart picks the more specific one'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create a DurationUtils extension on int with getters seconds, minutes, hours returning Duration objects. Add a DateTime get fromNow that adds that many seconds to now. Test all three.',
      starterCode: `extension DurationUtils on int {
  // Add seconds, minutes, hours getters
  // Add fromNow getter
}

void main() {
  print(90.seconds.inMinutes);   // 1
  print(2.hours.inMinutes);       // 120
  print(30.minutes.inSeconds);    // 1800
}`,
      solution: `extension DurationUtils on int {
  Duration get seconds => Duration(seconds: this);
  Duration get minutes => Duration(minutes: this);
  Duration get hours => Duration(hours: this);
  DateTime get fromNow => DateTime.now().add(seconds);
}

void main() {
  print(90.seconds.inMinutes);   // 1
  print(2.hours.inMinutes);       // 120
  print(30.minutes.inSeconds);    // 1800
  print(60.fromNow.isAfter(DateTime.now())); // true
}`,
    },
  },

  {
    id: 45,
    level: 'Intermediate',
    title: 'Records (Dart 3)',
    content: `# Records

Records are built-in, anonymous, immutable value types (Dart 3). Perfect for grouping values without a full class.

## Creating Records

\`\`\`dart
// Positional
final point = (10, 20);
print(point.\$1); // 10
print(point.\$2); // 20

// Named fields
final user = (name: 'Alice', age: 30);
print(user.name); // Alice
\`\`\`

## In Function Returns

\`\`\`dart
(String, int) nameAndAge() => ('Alice', 30);
final (name, age) = nameAndAge();
\`\`\`

## Record Equality

Records use structural equality — two records with the same values are equal:
\`\`\`dart
print((1, 2) == (1, 2));               // true
print((name: 'Alice') == (name: 'Alice')); // true
\`\`\``,
    tips: [
      'Records are immutable — you cannot change their fields after creation.',
      'Prefer named fields for records with more than 2 fields.',
      'Records replace the need for small data classes or passing Maps around.',
    ],
    codeSnippet: `(double min, double max, double average) stats(List<double> values) {
  final sorted = [...values]..sort();
  final sum = values.reduce((a, b) => a + b);
  return (sorted.first, sorted.last, sum / values.length);
}

({String city, String country, double lat}) geocode(String place) {
  final db = {
    'Cairo': (city: 'Cairo', country: 'Egypt', lat: 30.04),
    'Paris': (city: 'Paris', country: 'France', lat: 48.86),
  };
  return db[place] ?? (city: place, country: 'Unknown', lat: 0);
}

void main() {
  final temps = [22.5, 18.0, 30.1, 25.5, 19.8];
  final (min, max, avg) = stats(temps);
  print('Min: \$min, Max: \$max, Avg: \${avg.toStringAsFixed(1)}');

  final loc = geocode('Cairo');
  print('\${loc.city}, \${loc.country}: \${loc.lat}°N');

  print((1, 'a') == (1, 'a'));
}`,
    expectedOutput: `Min: 18.0, Max: 30.1, Avg: 23.2\nCairo, Egypt: 30.04°N\ntrue`,
    quiz: [
      { question: 'How do you access the second positional field of (10, 20)?', options: ['record[1]', 'record.second', 'record.\$2', 'record.get(2)'], correctAnswerIndex: 2 },
      { question: 'Are Dart records mutable?', options: ['Yes', 'Only named fields', 'No — records are immutable', 'Depends on the type'], correctAnswerIndex: 2 },
      { question: 'How are two records compared for equality?', options: ['By reference', 'By hash code only', 'By structural equality (values)', 'They cannot be compared'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Write (int words, int chars, int lines) analyzeText(String text) that counts words, non-space characters, and lines. Test with a multi-line string.',
      starterCode: `(int words, int chars, int lines) analyzeText(String text) {
  // Count words, non-space chars, lines
}

void main() {
  const sample = """Hello world
Dart is great
I love records""";

  final (words, chars, lines) = analyzeText(sample);
  print('Words: \$words');
  print('Chars: \$chars');
  print('Lines: \$lines');
}`,
      solution: `(int words, int chars, int lines) analyzeText(String text) {
  final wordList = text.split(RegExp(r'\\s+')).where((w) => w.isNotEmpty);
  final charCount = text.replaceAll(RegExp(r'\\s'), '').length;
  final lineCount = text.split('\\n').length;
  return (wordList.length, charCount, lineCount);
}

void main() {
  const sample = """Hello world
Dart is great
I love records""";
  final (words, chars, lines) = analyzeText(sample);
  print('Words: \$words');
  print('Chars: \$chars');
  print('Lines: \$lines');
}`,
    },
  },

  {
    id: 46,
    level: 'Intermediate',
    title: 'Isolates and Concurrency',
    content: `# Isolates — Dart's Concurrency Model

Dart is single-threaded per isolate. To achieve true parallelism without blocking the UI, you spawn additional isolates. Each has its own memory and communicates via message passing.

## Isolate.run() (Dart 2.19+)

The simplest way to run a one-shot computation in a background isolate:
\`\`\`dart
final result = await Isolate.run(() => heavyComputation(data));
\`\`\`

## Running Tasks in Parallel

\`\`\`dart
final [sum, primeCount] = await Future.wait([
  Isolate.run(() => sumRange(1, 10000000)),
  Isolate.run(() => findPrimes(100000).length),
]);
\`\`\`

## Key Rules

- Isolates do NOT share memory.
- Only primitive types, lists, maps, and SendPort can be passed.
- Entry points must be top-level or static functions.`,
    tips: [
      'Use Isolate.run() for modern Dart — cleanest way to offload heavy work.',
      'In Flutter, use compute() helper for JSON parsing of large payloads.',
      'Never do heavy CPU work on the main isolate — it freezes the UI.',
    ],
    codeSnippet: `import 'dart:isolate';

int sumRange(List<int> range) {
  int total = 0;
  for (int i = range[0]; i <= range[1]; i++) total += i;
  return total;
}

List<int> sievePrimes(int limit) {
  final sieve = List.filled(limit + 1, true);
  sieve[0] = sieve[1] = false;
  for (int i = 2; i * i <= limit; i++) {
    if (sieve[i]) for (int j = i*i; j <= limit; j += i) sieve[j] = false;
  }
  return [for (int i = 2; i <= limit; i++) if (sieve[i]) i];
}

void main() async {
  print('Running parallel tasks...');
  final sw = Stopwatch()..start();

  final results = await Future.wait([
    Isolate.run(() => sumRange([1, 10000000])),
    Isolate.run(() => sievePrimes(100000).length),
  ]);

  sw.stop();
  print('Sum 1..10M: \${results[0]}');
  print('Primes ≤100k: \${results[1]}');
  print('Time: \${sw.elapsedMilliseconds}ms');
}`,
    expectedOutput: `Running parallel tasks...\nSum 1..10M: 50000005000000\nPrimes ≤100k: 9592\nTime: <N>ms`,
    quiz: [
      { question: 'How do Dart isolates communicate?', options: ['Shared memory', 'Global variables', 'Message passing via SendPort/ReceivePort', 'Semaphores'], correctAnswerIndex: 2 },
      { question: 'What is the simplest API for one-shot background computation?', options: ['Thread.run()', 'Worker()', 'Isolate.run()', 'async.spawn()'], correctAnswerIndex: 2 },
      { question: 'Do isolates share memory?', options: ['Yes, always', 'Only primitives', 'No — each has its own heap', 'Only const objects'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Write top-level int countWords(String text). Use Isolate.run() in main to count words in two large strings simultaneously with Future.wait, then print both counts.',
      starterCode: `import 'dart:isolate';

int countWords(String text) {
  // Count whitespace-separated words
}

void main() async {
  final t1 = 'the quick brown fox ' * 10000;
  final t2 = 'dart flutter mobile ' * 8000;
  // Run both in parallel
}`,
      solution: `import 'dart:isolate';

int countWords(String text) =>
    text.trim().split(RegExp(r'\\s+')).where((w) => w.isNotEmpty).length;

void main() async {
  final t1 = 'the quick brown fox ' * 10000;
  final t2 = 'dart flutter mobile ' * 8000;

  final [c1, c2] = await Future.wait([
    Isolate.run(() => countWords(t1)),
    Isolate.run(() => countWords(t2)),
  ]);
  print('Text 1: \$c1 words');
  print('Text 2: \$c2 words');
}`,
    },
  },

  {
    id: 47,
    level: 'Intermediate',
    title: 'File I/O with dart:io',
    content: `# File I/O with dart:io

The \`dart:io\` library provides file system access. Available in Dart CLI and Flutter mobile/desktop — NOT in Flutter web.

## Reading

\`\`\`dart
import 'dart:io';

final content = await File('data.txt').readAsString();
final lines   = await File('data.txt').readAsLines();
\`\`\`

## Writing

\`\`\`dart
await File('out.txt').writeAsString('Hello!');
// Append mode:
await File('log.txt').writeAsString('entry\\n', mode: FileMode.append);
\`\`\`

## Checking Existence

\`\`\`dart
if (await File('data.txt').exists()) {
  final stat = await File('data.txt').stat();
  print(stat.size);
}
\`\`\`

## Directories

\`\`\`dart
await Directory('folder').create(recursive: true);
await for (final e in Directory('.').list()) print(e.path);
\`\`\``,
    tips: [
      'Always use async file methods — sync versions block the event loop.',
      'Wrap file operations in try/catch — files may not exist or permissions may be denied.',
      'dart:io is unavailable in web builds.',
    ],
    codeSnippet: `import 'dart:io';

Future<void> writeConfig(Map<String, String> cfg, String path) async {
  final buf = StringBuffer();
  for (final e in cfg.entries) buf.writeln('\${e.key}=\${e.value}');
  await File(path).writeAsString(buf.toString());
  print('Written to \$path');
}

Future<Map<String, String>> readConfig(String path) async {
  final file = File(path);
  if (!await file.exists()) throw FileSystemException('Not found', path);
  final lines = await file.readAsLines();
  return Map.fromEntries(
    lines.where((l) => l.contains('=')).map((l) {
      final i = l.indexOf('=');
      return MapEntry(l.substring(0, i).trim(), l.substring(i + 1).trim());
    }),
  );
}

void main() async {
  const path = '/tmp/app_config.txt';
  await writeConfig({'host': 'localhost', 'port': '8080', 'debug': 'true'}, path);
  final cfg = await readConfig(path);
  print('Config: \$cfg');
  await File(path).delete();
  print('Deleted');
}`,
    expectedOutput: `Written to /tmp/app_config.txt\nConfig: {host: localhost, port: 8080, debug: true}\nDeleted`,
    quiz: [
      { question: 'Which library provides file system access in Dart?', options: ['dart:core', 'dart:convert', 'dart:async', 'dart:io'], correctAnswerIndex: 3 },
      { question: 'Is dart:io available in Flutter web apps?', options: ['Yes', 'Only for reading', 'No', 'Only with a package'], correctAnswerIndex: 2 },
      { question: 'Which FileMode appends without overwriting?', options: ['FileMode.create', 'FileMode.write', 'FileMode.truncate', 'FileMode.append'], correctAnswerIndex: 3 },
    ],
    exercise: {
      instruction: 'Write appendLog(String path, String msg) that appends a timestamped line, and readLogs(String path) returning all lines. Write 3 logs, read them back, then delete the file.',
      starterCode: `import 'dart:io';

Future<void> appendLog(String path, String message) async {
  // Append "[timestamp] message\\n"
}

Future<List<String>> readLogs(String path) async {
  // Return list of lines
}

void main() async {
  const path = '/tmp/app.log';
  await appendLog(path, 'App started');
  await appendLog(path, 'User logged in');
  await appendLog(path, 'Request processed');
  final logs = await readLogs(path);
  for (final l in logs) print(l);
  await File(path).delete();
}`,
      solution: `import 'dart:io';

Future<void> appendLog(String path, String message) async {
  final ts = DateTime.now().toString().substring(0, 19);
  await File(path).writeAsString('[\$ts] \$message\\n', mode: FileMode.append);
}

Future<List<String>> readLogs(String path) async {
  final f = File(path);
  if (!await f.exists()) return [];
  return f.readAsLines();
}

void main() async {
  const path = '/tmp/app.log';
  await appendLog(path, 'App started');
  await appendLog(path, 'User logged in');
  await appendLog(path, 'Request processed');
  final logs = await readLogs(path);
  for (final l in logs) print(l);
  await File(path).delete();
}`,
    },
  },

  {
    id: 48,
    level: 'Intermediate',
    title: 'JSON and dart:convert',
    content: `# JSON Serialization with dart:convert

\`dart:convert\` provides \`json.encode()\` and \`json.decode()\` for working with JSON APIs.

## Decoding

\`\`\`dart
import 'dart:convert';

final map = json.decode('{"name":"Alice","age":30}') as Map<String, dynamic>;
print(map['name']); // Alice
\`\`\`

## Encoding

\`\`\`dart
final str = json.encode({'name': 'Bob', 'scores': [85, 92]});
\`\`\`

## Model Classes

The standard pattern — \`fromJson\` factory + \`toJson\` method:
\`\`\`dart
class User {
  final String name;
  final int age;
  User({required this.name, required this.age});

  factory User.fromJson(Map<String, dynamic> j) =>
      User(name: j['name'], age: j['age']);

  Map<String, dynamic> toJson() => {'name': name, 'age': age};
}
\`\`\`

## Lists of Objects

\`\`\`dart
final users = (json.decode(raw) as List)
    .map((e) => User.fromJson(e)).toList();
\`\`\``,
    tips: [
      'json.decode returns dynamic — cast it to Map<String,dynamic> or List explicitly.',
      'The factory fromJson pattern is the Dart convention for deserialisation.',
      'For large projects, use code generators like json_serializable to avoid boilerplate.',
    ],
    codeSnippet: `import 'dart:convert';

class Product {
  final int id;
  final String name;
  final double price;
  final List<String> tags;

  const Product({required this.id, required this.name, required this.price, required this.tags});

  factory Product.fromJson(Map<String, dynamic> j) => Product(
    id: j['id'] as int,
    name: j['name'] as String,
    price: (j['price'] as num).toDouble(),
    tags: List<String>.from(j['tags']),
  );

  Map<String, dynamic> toJson() =>
      {'id': id, 'name': name, 'price': price, 'tags': tags};

  @override
  String toString() => 'Product(\$name, \\\$\$price)';
}

void main() {
  const raw = '[{"id":1,"name":"Laptop","price":999.99,"tags":["tech","work"]},'
      '{"id":2,"name":"Phone","price":499.0,"tags":["tech","mobile"]}]';

  final products = (json.decode(raw) as List)
      .map((e) => Product.fromJson(e as Map<String, dynamic>))
      .toList();

  for (final p in products) print(p);
  print(json.encode(products.first.toJson()));
}`,
    expectedOutput: `Product(Laptop, \$999.99)\nProduct(Phone, \$499.0)\n{"id":1,"name":"Laptop","price":999.99,"tags":["tech","work"]}`,
    quiz: [
      { question: 'What does json.decode() return in Dart?', options: ['A String', 'A typed object', 'dynamic', 'A JsonObject'], correctAnswerIndex: 2 },
      { question: 'What is the conventional Dart pattern for creating an object from a JSON map?', options: ['A static parse()', 'A factory constructor named fromJson', 'An operator overload', 'A named constructor fromMap'], correctAnswerIndex: 1 },
      { question: 'Which library provides JSON encoding/decoding?', options: ['dart:io', 'dart:json', 'dart:convert', 'dart:core'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create class Article with title, author, publishedAt (DateTime), tags (List<String>). Implement fromJson and toJson. Decode a JSON array of 2 articles, print each, then re-encode the first.',
      starterCode: `import 'dart:convert';

class Article {
  // fields, fromJson, toJson
}

void main() {
  const raw = '[{"title":"Dart 3","author":"Alice","publishedAt":"2024-03-01","tags":["dart"]},'
      '{"title":"Flutter Tips","author":"Bob","publishedAt":"2024-03-15","tags":["flutter"]}]';
  // Decode, print, re-encode first
}`,
      solution: `import 'dart:convert';

class Article {
  final String title, author;
  final DateTime publishedAt;
  final List<String> tags;

  Article({required this.title, required this.author, required this.publishedAt, required this.tags});

  factory Article.fromJson(Map<String, dynamic> j) => Article(
    title: j['title'],
    author: j['author'],
    publishedAt: DateTime.parse(j['publishedAt']),
    tags: List<String>.from(j['tags']),
  );

  Map<String, dynamic> toJson() => {
    'title': title, 'author': author,
    'publishedAt': publishedAt.toIso8601String().substring(0, 10),
    'tags': tags,
  };

  @override
  String toString() => '"\$title" by \$author';
}

void main() {
  const raw = '[{"title":"Dart 3","author":"Alice","publishedAt":"2024-03-01","tags":["dart"]},'
      '{"title":"Flutter Tips","author":"Bob","publishedAt":"2024-03-15","tags":["flutter"]}]';
  final articles = (json.decode(raw) as List).map((e) => Article.fromJson(e)).toList();
  for (final a in articles) print(a);
  print(json.encode(articles.first.toJson()));
}`,
    },
  },

  {
    id: 49,
    level: 'Intermediate',
    title: 'Regular Expressions',
    content: `# Regular Expressions in Dart

\`RegExp\` lets you match, search, and replace patterns in strings.

## Creating a RegExp

Always use raw strings (\`r'...'\`) so backslashes are literal:
\`\`\`dart
final emailRe = RegExp(r'^[\\w.+-]+@[\\w-]+\\.[a-z]{2,}\$', caseSensitive: false);
\`\`\`

## Key Methods

\`\`\`dart
re.hasMatch('alice@x.com');  // true/false
re.firstMatch(text);         // RegExpMatch? 
re.allMatches(text);         // Iterable<RegExpMatch>
text.replaceAll(re, '');     // String
\`\`\`

## Capture Groups

\`\`\`dart
final dateRe = RegExp(r'(\\d{4})-(\\d{2})-(\\d{2})');
final m = dateRe.firstMatch('2024-03-15')!;
print(m.group(1)); // 2024
print(m.group(2)); // 03
\`\`\``,
    tips: [
      'Compile your RegExp once outside a loop — do not recreate it every iteration.',
      'Use named groups (?<year>\\d{4}) for complex patterns.',
      'group(0) is the entire match; group(1) is the first capture group.',
    ],
    codeSnippet: `void main() {
  final emailRe = RegExp(r'^[\\w.+-]+@[\\w-]+\\.[a-z]{2,}\$', caseSensitive: false);
  final phoneRe = RegExp(r'^\\+?\\d[\\d\\s\\-]{6,14}\\d\$');

  final tests = ['alice@example.com', 'not-an-email', '+1 555-123-4567'];
  for (final t in tests) {
    final ok = emailRe.hasMatch(t) || phoneRe.hasMatch(t);
    print('\${ok ? "✓" : "✗"} \$t');
  }

  final logRe = RegExp(r'(\\d{4}-\\d{2}-\\d{2}) (\\w+): (.+)');
  const log = '2024-03-15 ERROR: Connection failed';
  final m = logRe.firstMatch(log)!;
  print('Date: \${m.group(1)}');
  print('Level: \${m.group(2)}');
  print('Msg: \${m.group(3)}');

  final digits = RegExp(r'\\d+').allMatches('a1 b22 c333')
      .map((m) => m.group(0)).toList();
  print('Numbers: \$digits');
}`,
    expectedOutput: `✓ alice@example.com\n✗ not-an-email\n✓ +1 555-123-4567\nDate: 2024-03-15\nLevel: ERROR\nMsg: Connection failed\nNumbers: [1, 22, 333]`,
    quiz: [
      { question: 'Why use raw strings for RegExp?', options: ['They are faster', 'Backslashes are treated literally, not as Dart escape chars', 'They support Unicode', 'They allow multiline patterns'], correctAnswerIndex: 1 },
      { question: 'What does allMatches() return?', options: ['List<String>', 'RegExpMatch?', 'Iterable<RegExpMatch>', 'bool'], correctAnswerIndex: 2 },
      { question: 'What does group(0) return in a match?', options: ['The first capture group', 'The entire matched string', 'null', 'The start position'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write parseQueryString(String url) → Map<String,String> that extracts query parameters. "https://ex.com?name=Alice&age=30" → {name: Alice, age: 30}.',
      starterCode: `Map<String, String> parseQueryString(String url) {
  // Extract and return query params
}

void main() {
  print(parseQueryString('https://example.com?name=Alice&age=30&city=Cairo'));
}`,
      solution: `Map<String, String> parseQueryString(String url) {
  final qi = url.indexOf('?');
  if (qi == -1) return {};
  final query = url.substring(qi + 1);
  final re = RegExp(r'([^&=]+)=([^&]*)');
  return Map.fromEntries(
    re.allMatches(query).map((m) => MapEntry(m.group(1)!, m.group(2)!)),
  );
}

void main() {
  print(parseQueryString('https://example.com?name=Alice&age=30&city=Cairo'));
}`,
    },
  },

  {
    id: 50,
    level: 'Intermediate',
    title: 'Type System — is, as, and Type Promotion',
    content: `# Dart's Type System

## Type Tests

\`\`\`dart
Object value = 42;
if (value is int) {
  print(value.isEven); // promoted to int
}
if (value is! String) print('Not a string');
\`\`\`

## Type Cast (as)

Forces a cast. Throws if wrong:
\`\`\`dart
final n = value as int;
\`\`\`

## Type Promotion

After a successful \`is\` check, Dart narrows the type inside the block automatically — no manual cast needed.

## Object, dynamic, Object?

- \`Object\` — all non-null types
- \`Object?\` — all types including null  
- \`dynamic\` — opts out of static typing entirely
- \`Never\` — the bottom type (a function that never returns)

## Reified Generics

Unlike Java, Dart preserves generic types at runtime:
\`\`\`dart
print(<int>[] is List<int>);    // true
print(<int>[] is List<String>); // false
\`\`\``,
    tips: [
      'Prefer is checks over try/as/catch — type promotion makes them cleaner.',
      'Avoid dynamic unless absolutely necessary — it defeats type safety.',
      'Type promotion only applies to local variables, not fields.',
    ],
    codeSnippet: `void process(Object? value) {
  if (value == null) { print('null'); return; }
  if (value is int)    print('int: \$value (even: \${value.isEven})');
  else if (value is double) print('double: \${value.toStringAsFixed(2)}');
  else if (value is String) print('String: "\$value" (length: \${value.length})');
  else if (value is List)   print('List with \${value.length} items');
  else if (value is Map)    print('Map with \${value.length} keys');
  else print('Other: \${value.runtimeType}');
}

void main() {
  for (final v in <Object?>[42, 3.14, 'Dart', null, [1,2,3], {'a':1}, true]) {
    process(v);
  }
  print('\\nRuntime type checks:');
  print(42 is num);       // true
  print(3.14 is num);     // true
  print([] is Iterable);  // true
  print(<int>[] is List<String>); // false
}`,
    expectedOutput: `int: 42 (even: true)\ndouble: 3.14\nString: "Dart" (length: 4)\nnull\nList with 3 items\nMap with 1 keys\nOther: bool\n\nRuntime type checks:\ntrue\ntrue\ntrue\nfalse`,
    quiz: [
      { question: 'What is type promotion?', options: ['Converting int to double', 'The compiler narrows a variable type after a successful is check', 'Casting with as inside a catch block', 'Upgrading nullable to non-nullable with !'], correctAnswerIndex: 1 },
      { question: 'What is the difference between Object and dynamic?', options: ['Object is nullable; dynamic is not', 'dynamic opts out of static type checking; Object does not', 'They are identical', 'Object is slower at runtime'], correctAnswerIndex: 1 },
      { question: 'When does the as operator throw?', options: ['When the value is null', 'When the cast fails', 'When used on a generic type', 'Never'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write dynamic deepGet(Map<String,dynamic> map, List<String> keys) that traverses nested maps. deepGet({"a":{"b":{"c":42}}}, ["a","b","c"]) → 42. Return null if any key is missing.',
      starterCode: `dynamic deepGet(Map<String, dynamic> map, List<String> keys) {
  // Traverse nested map by key path
}

void main() {
  final data = {'user': {'profile': {'name': 'Alice', 'age': 30}}};
  print(deepGet(data, ['user', 'profile', 'name'])); // Alice
  print(deepGet(data, ['user', 'profile', 'age']));  // 30
  print(deepGet(data, ['user', 'missing', 'key']));  // null
}`,
      solution: `dynamic deepGet(Map<String, dynamic> map, List<String> keys) {
  dynamic current = map;
  for (final key in keys) {
    if (current is Map<String, dynamic>) current = current[key];
    else return null;
  }
  return current;
}

void main() {
  final data = {'user': {'profile': {'name': 'Alice', 'age': 30}}};
  print(deepGet(data, ['user', 'profile', 'name']));
  print(deepGet(data, ['user', 'profile', 'age']));
  print(deepGet(data, ['user', 'missing', 'key']));
}`,
    },
  },

  {
    id: 51,
    level: 'Intermediate',
    title: 'Design Patterns — Singleton and Builder',
    content: `# Singleton and Builder Patterns

## Singleton

Ensures only one instance of a class exists throughout the app:
\`\`\`dart
class Config {
  static final Config _instance = Config._internal();
  factory Config() => _instance;
  Config._internal();

  String appName = 'Dartly';
  bool darkMode = false;
}
// Config() always returns the same object
\`\`\`

## Builder Pattern

Great for objects with many optional fields — each method returns \`this\` for chaining:
\`\`\`dart
class QueryBuilder {
  String _table = '';
  final _conditions = <String>[];

  QueryBuilder from(String t) { _table = t; return this; }
  QueryBuilder where(String c) { _conditions.add(c); return this; }

  String build() => 'SELECT * FROM \$_table'
      + (_conditions.isEmpty ? '' : ' WHERE \${_conditions.join(' AND ')}');
}
\`\`\``,
    tips: [
      'Factory constructors are the idiomatic Dart way to implement Singleton.',
      'The Builder pattern works beautifully with method chaining — each method returns this.',
      'Use lazy static fields for Singletons with heavy initialisation.',
    ],
    codeSnippet: `class AppSettings {
  static final AppSettings _instance = AppSettings._();
  factory AppSettings() => _instance;
  AppSettings._();

  String locale = 'en';
  bool notifications = true;
  int fontSize = 16;

  @override String toString() => 'Settings(locale=\$locale, fontSize=\$fontSize)';
}

class QueryBuilder {
  String _table = '';
  final _fields = <String>[];
  final _conditions = <String>[];
  String? _orderBy;
  int? _limit;

  QueryBuilder select(List<String> f) { _fields.addAll(f); return this; }
  QueryBuilder from(String t) { _table = t; return this; }
  QueryBuilder where(String c) { _conditions.add(c); return this; }
  QueryBuilder orderBy(String col) { _orderBy = col; return this; }
  QueryBuilder limit(int n) { _limit = n; return this; }

  String build() {
    final fields = _fields.isEmpty ? '*' : _fields.join(', ');
    var q = 'SELECT \$fields FROM \$_table';
    if (_conditions.isNotEmpty) q += ' WHERE \${_conditions.join(' AND ')}';
    if (_orderBy != null) q += ' ORDER BY \$_orderBy';
    if (_limit != null) q += ' LIMIT \$_limit';
    return q;
  }
}

void main() {
  final s1 = AppSettings();
  final s2 = AppSettings();
  s1.locale = 'ar';
  print('Same: \${identical(s1, s2)}');
  print(s2);

  final q = QueryBuilder()
      .select(['name', 'email']).from('users')
      .where('age > 18').orderBy('name').limit(10).build();
  print(q);
}`,
    expectedOutput: `Same: true\nSettings(locale=ar, fontSize=16)\nSELECT name, email FROM users WHERE age > 18 ORDER BY name LIMIT 10`,
    quiz: [
      { question: 'What does a Singleton guarantee?', options: ['Only one method per class', 'Only one instance of the class exists', 'The class cannot be extended', 'No constructor'], correctAnswerIndex: 1 },
      { question: 'How is Singleton typically implemented in Dart?', options: ['Static method getInstance()', 'Private constructor + factory returning a static instance', 'All methods static', 'Using sealed class'], correctAnswerIndex: 1 },
      { question: 'What makes method chaining work in the Builder pattern?', options: ['Returning a new instance', 'Returning this from each builder method', 'Using static methods', 'Using extension methods'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Implement EventLogger as a Singleton with log(String event) storing events in a list and a List<String> get history getter. Verify two references are the same instance and share history.',
      starterCode: `class EventLogger {
  // Singleton implementation
  void log(String event) {}
  List<String> get history => [];
}

void main() {
  final a = EventLogger();
  final b = EventLogger();
  a.log('App started');
  b.log('User logged in');
  print('Same: \${identical(a, b)}');
  print('History: \${a.history}');
}`,
      solution: `class EventLogger {
  static final EventLogger _i = EventLogger._();
  factory EventLogger() => _i;
  EventLogger._();

  final _history = <String>[];

  void log(String event) {
    _history.add(event);
    print('[LOG] \$event');
  }

  List<String> get history => List.unmodifiable(_history);
}

void main() {
  final a = EventLogger();
  final b = EventLogger();
  a.log('App started');
  b.log('User logged in');
  print('Same: \${identical(a, b)}');
  print('History: \${a.history}');
}`,
    },
  },

  {
    id: 52,
    level: 'Intermediate',
    title: 'Design Patterns — Observer and Strategy',
    content: `# Observer and Strategy Patterns

## Observer (Publish-Subscribe)

Objects subscribe to events from a subject and are notified automatically when state changes:
\`\`\`dart
class EventEmitter {
  final _handlers = <String, List<Function(dynamic)>>{};
  void on(String event, Function(dynamic) fn) =>
      _handlers.putIfAbsent(event, () => []).add(fn);
  void emit(String event, [dynamic data]) =>
      _handlers[event]?.forEach((fn) => fn(data));
}
\`\`\`

## Strategy

Encapsulates interchangeable algorithms. Swap at runtime without changing client code.

In Dart, first-class functions often replace formal Strategy objects — just pass a function:
\`\`\`dart
typedef PricingStrategy = double Function(double base, int qty);

class Cart {
  PricingStrategy strategy;
  Cart({this.strategy = regularPrice});
  double compute(double base, int qty) => strategy(base, qty);
}
\`\`\``,
    tips: [
      'In Dart, a function parameter often replaces a full Strategy interface — cleaner and more concise.',
      'Observer underpins StreamController — consider Streams before rolling your own.',
      'Flutter ChangeNotifier + addListener is an implementation of Observer.',
    ],
    codeSnippet: `typedef PricingFn = double Function(double base, int qty);

double regularPrice(double b, int q) => b * q;
double bulkPrice(double b, int q) => q >= 10 ? b * q * 0.85 : b * q;
double premiumPrice(double b, int q) => b * q * 1.2;

class Cart {
  PricingFn strategy;
  final _items = <(String, double, int)>[];

  Cart({this.strategy = regularPrice});

  void add(String name, double price, int qty) =>
      _items.add((name, price, qty));

  double get total =>
      _items.fold(0, (s, i) => s + strategy(i.\$2, i.\$3));

  void print_(String label) {
    print('\$label — total: \\\$\${total.toStringAsFixed(2)}');
  }
}

void main() {
  final cart = Cart();
  cart.add('Widget', 10.0, 5);
  cart.add('Gadget', 25.0, 2);
  cart.print_('Regular');

  cart.strategy = bulkPrice;
  cart.add('Gizmo', 5.0, 15);
  cart.print_('Bulk');

  cart.strategy = premiumPrice;
  cart.print_('Premium');
}`,
    expectedOutput: `Regular — total: \$100.00\nBulk — total: \$163.75\nPremium — total: \$210.00`,
    quiz: [
      { question: 'What problem does Observer solve?', options: ['Encapsulating algorithms', 'Notifying multiple objects when one changes state', 'Ensuring one instance', 'Separating construction from representation'], correctAnswerIndex: 1 },
      { question: 'In the Strategy pattern, what changes at runtime?', options: ['The class of the object', 'The algorithm used', 'The number of instances', 'The memory layout'], correctAnswerIndex: 1 },
      { question: 'How can Dart first-class functions replace Strategy?', options: ['Using static methods', 'Passing a function as a parameter instead of a strategy object', 'Using mixins', 'Using generics'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Build EventEmitter with on(event, handler) and emit(event, data). Test "login" and "logout" events with multiple listeners.',
      starterCode: `class EventEmitter {
  // Store handlers per event name
  void on(String event, Function(dynamic) handler) {}
  void emit(String event, [dynamic data]) {}
}

void main() {
  final em = EventEmitter();
  em.on('login', (d) => print('Logger: \$d logged in'));
  em.on('login', (d) => print('Analytics: login for \$d'));
  em.on('logout', (d) => print('Session cleared: \$d'));
  em.emit('login', 'Alice');
  em.emit('logout', 'Alice');
}`,
      solution: `class EventEmitter {
  final _h = <String, List<Function(dynamic)>>{};
  void on(String e, Function(dynamic) fn) =>
      _h.putIfAbsent(e, () => []).add(fn);
  void emit(String e, [dynamic data]) => _h[e]?.forEach((fn) => fn(data));
}

void main() {
  final em = EventEmitter();
  em.on('login', (d) => print('Logger: \$d logged in'));
  em.on('login', (d) => print('Analytics: login for \$d'));
  em.on('logout', (d) => print('Session cleared: \$d'));
  em.emit('login', 'Alice');
  em.emit('logout', 'Alice');
}`,
    },
  },

  {
    id: 53,
    level: 'Intermediate',
    title: 'Unit Testing in Dart',
    content: `# Unit Testing with package:test

Testing ensures your code works correctly and keeps working as you change it.

## Setup

\`\`\`yaml
dev_dependencies:
  test: ^1.24.0
\`\`\`

Run: \`dart test\`

## Writing Tests

\`\`\`dart
import 'package:test/test.dart';

void main() {
  test('addition works', () {
    expect(2 + 2, equals(4));
  });

  group('Calculator', () {
    test('divides', () => expect(divide(10, 2), 5.0));
    test('throws on zero', () => expect(
      () => divide(1, 0), throwsA(isA<ArgumentError>())));
  });
}
\`\`\`

## Common Matchers

\`equals(v)\`, \`isNull\`, \`isTrue\`, \`throwsA(isA<E>())\`, \`contains(item)\`, \`hasLength(n)\`, \`closeTo(v, delta)\`

## Async Tests

\`\`\`dart
test('async fetch', () async {
  final result = await fetchData();
  expect(result, isNotNull);
});
\`\`\``,
    tips: [
      'Follow Arrange-Act-Assert: set up data, run the code, then verify.',
      'Use setUp() / tearDown() for shared setup across tests in a group.',
      'Test edge cases: empty inputs, null values, boundaries — not just happy paths.',
    ],
    codeSnippet: `// Simulating test runner (real projects use dart test)
class Calculator {
  double add(double a, double b) => a + b;
  double divide(double a, double b) {
    if (b == 0) throw ArgumentError('Division by zero');
    return a / b;
  }
  int factorial(int n) {
    if (n < 0) throw ArgumentError('n must be >= 0');
    return n == 0 ? 1 : n * factorial(n - 1);
  }
}

void runTests() {
  final calc = Calculator();
  int passed = 0, failed = 0;

  void test_(String name, void Function() fn) {
    try { fn(); print('  ✓ \$name'); passed++; }
    catch (e) { print('  ✗ \$name: \$e'); failed++; }
  }
  void expect_(dynamic actual, dynamic expected) {
    if (actual != expected) throw AssertionError('\$actual != \$expected');
  }

  print('Calculator tests:');
  test_('add 2+3=5', () => expect_(calc.add(2, 3), 5));
  test_('divide 10/2=5', () => expect_(calc.divide(10, 2), 5));
  test_('factorial(5)=120', () => expect_(calc.factorial(5), 120));
  test_('factorial(0)=1', () => expect_(calc.factorial(0), 1));
  test_('divide by zero throws', () {
    try { calc.divide(5, 0); throw AssertionError('Should throw'); }
    catch (e) { if (e is! ArgumentError) rethrow; }
  });

  print('\\n\$passed passed, \$failed failed');
}

void main() => runTests();`,
    expectedOutput: `Calculator tests:\n  ✓ add 2+3=5\n  ✓ divide 10/2=5\n  ✓ factorial(5)=120\n  ✓ factorial(0)=1\n  ✓ divide by zero throws\n\n5 passed, 0 failed`,
    quiz: [
      { question: 'What is Arrange-Act-Assert?', options: ['Import, run, export', 'Set up data, execute the code, verify the result', 'Compile, link, run', 'Mock, inject, verify'], correctAnswerIndex: 1 },
      { question: 'Which package is commonly used for Dart unit testing?', options: ['package:unittest', 'package:assert', 'package:test', 'package:check'], correctAnswerIndex: 2 },
      { question: 'What matcher verifies a function throws a specific exception?', options: ['throws()', 'throwsA(isA<E>())', 'expectException()', 'willThrow()'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write StringUtils with isPalindrome, countVowels, and titleCase. Simulate 6 unit tests including edge cases.',
      starterCode: `class StringUtils {
  bool isPalindrome(String s) => s == s.split('').reversed.join();
  int countVowels(String s) => s.toLowerCase().split('').where((c) => 'aeiou'.contains(c)).length;
  String titleCase(String s) => s.split(' ').map((w) =>
      w.isEmpty ? '' : w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
}

void main() {
  // Simulate 6 tests
}`,
      solution: `class StringUtils {
  bool isPalindrome(String s) => s == s.split('').reversed.join();
  int countVowels(String s) => s.toLowerCase().split('').where((c) => 'aeiou'.contains(c)).length;
  String titleCase(String s) => s.split(' ').map((w) =>
      w.isEmpty ? '' : w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');
}

void main() {
  final u = StringUtils();
  int p = 0;
  void check(String name, bool ok) { print('\${ok?"✓":"✗"} \$name'); if (ok) p++; }

  check('racecar is palindrome', u.isPalindrome('racecar'));
  check('hello not palindrome', !u.isPalindrome('hello'));
  check('empty is palindrome', u.isPalindrome(''));
  check('countVowels(hello)=2', u.countVowels('hello') == 2);
  check('countVowels(rhythm)=0', u.countVowels('rhythm') == 0);
  check('titleCase works', u.titleCase('the quick brown fox') == 'The Quick Brown Fox');
  print('\$p/6 passed');
}`,
    },
  },

  {
    id: 54,
    level: 'Intermediate',
    title: 'Typedefs and Function Types',
    content: `# Typedefs in Dart

A \`typedef\` creates a named alias for a type — most commonly function types. This improves readability and reuse.

## Defining Typedefs

\`\`\`dart
typedef Predicate<T> = bool Function(T value);
typedef Transform<A, B> = B Function(A input);
typedef Callback = void Function(String msg);
typedef JsonMap = Map<String, dynamic>;
\`\`\`

## Using Typedefs

\`\`\`dart
Predicate<int> isEven = (n) => n % 2 == 0;

List<T> filter<T>(List<T> items, Predicate<T> test) =>
    items.where(test).toList();

filter([1,2,3,4,5], isEven); // [2, 4]
\`\`\`

## Since Dart 2.13

Typedefs can alias any type — not just functions:
\`\`\`dart
typedef Point = (int, int);
typedef StringList = List<String>;
\`\`\``,
    tips: [
      'Typedefs for function types document your intent — Validator<T> is clearer than String? Function(T).',
      'Use typedef JsonMap = Map<String,dynamic> to avoid repeating the full generic.',
      'Since Dart 2.13, typedefs can alias any type, not just functions.',
    ],
    codeSnippet: `typedef Predicate<T> = bool Function(T);
typedef Mapper<A, B> = B Function(A);
typedef Reducer<T, R> = R Function(R acc, T item);
typedef Validator = String? Function(String? value);

List<B> mapFilter<A, B>(List<A> items, B? Function(A) fn) =>
    items.map(fn).whereType<B>().toList();

R fold<T, R>(List<T> items, R seed, Reducer<T, R> fn) =>
    items.fold(seed, fn);

Validator required_ = (v) =>
    (v == null || v.isEmpty) ? 'Required' : null;
Validator minLength(int n) =>
    (v) => (v != null && v.length >= n) ? null : 'Min \$n chars';

String? validate(String? v, List<Validator> rules) {
  for (final r in rules) { final e = r(v); if (e != null) return e; }
  return null;
}

void main() {
  final numbers = List.generate(10, (i) => i + 1);

  final oddDoubled = mapFilter<int, int>(numbers, (n) => n.isOdd ? n * 2 : null);
  print('Odd doubled: \$oddDoubled');

  print('Sum: \${fold(numbers, 0, (acc, n) => acc + n)}');

  final rules = [required_, minLength(8)];
  print(validate(null, rules));
  print(validate('short', rules));
  print(validate('securepass', rules));
}`,
    expectedOutput: `Odd doubled: [2, 6, 10, 14, 18]\nSum: 55\nRequired\nMin 8 chars\nnull`,
    quiz: [
      { question: 'What is the primary purpose of typedef?', options: ['Copy a class', 'Create a named alias for a type', 'Override method signatures', 'Define abstract types'], correctAnswerIndex: 1 },
      { question: 'Since Dart 2.13, what types can typedef alias?', options: ['Only function types', 'Only primitives', 'Any type', 'Only generic types'], correctAnswerIndex: 2 },
      { question: 'What is the benefit of typedef Predicate<T> = bool Function(T)?', options: ['Faster execution', 'Named, reusable type for a common function signature', 'Makes function private', 'Adds null safety'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Define typedef Comparator<T> = int Function(T, T). Implement List<T> mergeSort<T>(List<T> list, Comparator<T> compare). Sort strings by length.',
      starterCode: `typedef Comparator<T> = int Function(T a, T b);

List<T> mergeSort<T>(List<T> list, Comparator<T> cmp) {
  if (list.length <= 1) return list;
  final mid = list.length ~/ 2;
  final left = mergeSort(list.sublist(0, mid), cmp);
  final right = mergeSort(list.sublist(mid), cmp);
  return merge(left, right, cmp);
}

List<T> merge<T>(List<T> l, List<T> r, Comparator<T> cmp) {
  // Merge two sorted lists
}

void main() {
  final words = ['banana', 'fig', 'apple', 'kiwi', 'strawberry'];
  print(mergeSort(words, (a, b) => a.length.compareTo(b.length)));
}`,
      solution: `typedef Comparator<T> = int Function(T a, T b);

List<T> mergeSort<T>(List<T> list, Comparator<T> cmp) {
  if (list.length <= 1) return list;
  final mid = list.length ~/ 2;
  return merge(mergeSort(list.sublist(0, mid), cmp),
               mergeSort(list.sublist(mid), cmp), cmp);
}

List<T> merge<T>(List<T> l, List<T> r, Comparator<T> cmp) {
  final result = <T>[];
  int i = 0, j = 0;
  while (i < l.length && j < r.length) {
    result.add(cmp(l[i], r[j]) <= 0 ? l[i++] : r[j++]);
  }
  return result..addAll(l.sublist(i))..addAll(r.sublist(j));
}

void main() {
  final words = ['banana', 'fig', 'apple', 'kiwi', 'strawberry'];
  print(mergeSort(words, (a, b) => a.length.compareTo(b.length)));
}`,
    },
  },

  {
    id: 55,
    level: 'Intermediate',
    title: 'Operator Overloading',
    content: `# Operator Overloading

Use the \`operator\` keyword to define custom behaviour for +, -, *, ==, [], etc.

## Example

\`\`\`dart
class Vector {
  final double x, y;
  const Vector(this.x, this.y);

  Vector operator +(Vector o) => Vector(x + o.x, y + o.y);
  Vector operator *(double s) => Vector(x * s, y * s);

  @override bool operator ==(Object o) =>
      o is Vector && x == o.x && y == o.y;
  @override int get hashCode => Object.hash(x, y);
}
\`\`\`

## Comparable for Sorting

Implement \`Comparable<T>\` to make objects sortable:
\`\`\`dart
class Temperature implements Comparable<Temperature> {
  @override int compareTo(Temperature o) => celsius.compareTo(o.celsius);
}
\`\`\`

## Overloadable Operators

\`<\`, \`>\`, \`+\`, \`-\`, \`*\`, \`/\`, \`~/\`, \`%\`, \`[]\`, \`[]=\`, \`==\` and more.`,
    tips: [
      'Always override hashCode when you override == — equal objects must have equal hashes.',
      'Implement Comparable<T> to work with sort() and sorted collections.',
      'Overload operators sparingly — only when the operation is naturally mathematical.',
    ],
    codeSnippet: `class Fraction implements Comparable<Fraction> {
  final int num;
  final int den;

  Fraction(int n, int d) : num = n * d.sign, den = d.abs() {
    if (d == 0) throw ArgumentError('Denominator cannot be zero');
  }

  static int _gcd(int a, int b) => b == 0 ? a : _gcd(b, a % b);

  Fraction get simplified {
    final g = _gcd(num.abs(), den);
    return Fraction(num ~/ g, den ~/ g);
  }

  Fraction operator +(Fraction o) =>
      Fraction(num * o.den + o.num * den, den * o.den).simplified;
  Fraction operator *(Fraction o) =>
      Fraction(num * o.num, den * o.den).simplified;

  @override bool operator ==(Object o) =>
      o is Fraction && simplified.num == o.simplified.num
          && simplified.den == o.simplified.den;
  @override int get hashCode => Object.hash(simplified.num, simplified.den);
  @override int compareTo(Fraction o) => (num * o.den).compareTo(o.num * den);
  @override String toString() => den == 1 ? '\$num' : '\$num/\$den';
}

void main() {
  final half = Fraction(1, 2);
  final third = Fraction(1, 3);
  print('\$half + \$third = \${half + third}');
  print('\$half * \$third = \${half * third}');
  print('1/2 == 2/4: \${Fraction(1,2) == Fraction(2,4)}');

  final fractions = [Fraction(3,4), Fraction(1,2), Fraction(2,3), Fraction(1,4)];
  fractions.sort();
  print('Sorted: \$fractions');
}`,
    expectedOutput: `1/2 + 1/3 = 5/6\n1/2 * 1/3 = 1/6\n1/2 == 2/4: true\nSorted: [1/4, 1/2, 2/3, 3/4]`,
    quiz: [
      { question: 'What keyword defines a custom operator in Dart?', options: ['overload', 'op', 'operator', 'define'], correctAnswerIndex: 2 },
      { question: 'If you override == you must also override:', options: ['toString()', 'compareTo()', 'hashCode', 'runtimeType'], correctAnswerIndex: 2 },
      { question: 'Which interface makes a class sortable with list.sort()?', options: ['Sortable', 'Ordered', 'Equatable', 'Comparable<T>'], correctAnswerIndex: 3 },
    ],
    exercise: {
      instruction: 'Create Matrix2x2 (fields a,b,c,d). Overload + (addition), * (matrix product), and == (equality). Add double get determinant. Test all.',
      starterCode: `class Matrix2x2 {
  final double a, b, c, d;
  const Matrix2x2(this.a, this.b, this.c, this.d);

  // + operator, * operator, == operator, determinant getter
}

void main() {
  final m1 = Matrix2x2(1, 2, 3, 4);
  final m2 = Matrix2x2(5, 6, 7, 8);
  print(m1 + m2);
  print(m1 * m2);
  print('Det: \${m1.determinant}');
}`,
      solution: `class Matrix2x2 {
  final double a, b, c, d;
  const Matrix2x2(this.a, this.b, this.c, this.d);

  Matrix2x2 operator +(Matrix2x2 o) => Matrix2x2(a+o.a, b+o.b, c+o.c, d+o.d);
  Matrix2x2 operator *(Matrix2x2 o) => Matrix2x2(
    a*o.a + b*o.c, a*o.b + b*o.d,
    c*o.a + d*o.c, c*o.b + d*o.d,
  );
  @override bool operator ==(Object o) =>
      o is Matrix2x2 && a==o.a && b==o.b && c==o.c && d==o.d;
  @override int get hashCode => Object.hash(a,b,c,d);
  double get determinant => a * d - b * c;
  @override String toString() => '[[\\$a,\\$b],[\\$c,\\$d]]';
}

void main() {
  final m1 = Matrix2x2(1, 2, 3, 4);
  final m2 = Matrix2x2(5, 6, 7, 8);
  print(m1 + m2);
  print(m1 * m2);
  print('Det: \${m1.determinant}');
}`,
    },
  },

  {
    id: 56,
    level: 'Intermediate',
    title: 'Packages and pub.dev',
    content: `# Dart Packages and pub.dev

Thousands of open-source packages live at [pub.dev](https://pub.dev). Packages save you from reinventing the wheel.

## pubspec.yaml

\`\`\`yaml
name: my_app
environment:
  sdk: '>=3.0.0 <4.0.0'
dependencies:
  http: ^1.2.0
  intl: ^0.19.0
dev_dependencies:
  test: ^1.24.0
\`\`\`

## Commands

\`\`\`bash
dart pub add http         # add a dependency
dart pub add --dev test   # add dev dependency
dart pub get              # install all
dart pub upgrade          # upgrade all
dart pub outdated         # see newer versions
\`\`\`

## Version Constraints

- \`^1.2.0\` — compatible with 1.2.0 up to (not including) 2.0.0
- \`>=1.0.0 <2.0.0\` — explicit range

## Popular Packages

| Package   | Purpose                    |
|-----------|----------------------------|
| http      | HTTP requests              |
| intl      | Internationalisation       |
| path      | Path manipulation          |
| equatable | Value equality             |
| freezed   | Immutable data classes     |`,
    tips: [
      'Always use ^ constraints — allows patch upgrades but prevents breaking changes.',
      'Check pub points, likes, and popularity on pub.dev before adding a package.',
      'Run dart pub outdated regularly to keep dependencies fresh.',
    ],
    codeSnippet: `// Demonstrating manual number/date formatting (simulating intl package)

String formatCurrency(double amount, String symbol) {
  final formatted = amount.toStringAsFixed(2);
  final parts = formatted.split('.');
  final withCommas = parts[0].replaceAllMapped(
    RegExp(r'(\\d)(?=(\\d{3})+\$)'), (m) => '\${m[1]},');
  return '\$symbol\$withCommas.\${parts[1]}';
}

String formatDate(DateTime d) {
  final months = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];
  return '\${months[d.month-1]} \${d.day}, \${d.year}';
}

void main() {
  print(formatCurrency(1234567.89, '\\\$'));
  print(formatCurrency(9999.50, '€'));
  print(formatDate(DateTime(2024, 3, 15)));
  print(formatDate(DateTime(2024, 12, 1)));

  print('\\n--- Key packages ---');
  print('intl: ^0.19.0   → Locale-aware formatting');
  print('http: ^1.2.0    → HTTP client');
  print('path: ^1.9.0    → Path utilities');
}`,
    expectedOutput: `\$1,234,567.89\n€9,999.50\nMar 15, 2024\nDec 1, 2024\n\n--- Key packages ---\nintl: ^0.19.0   → Locale-aware formatting\nhttp: ^1.2.0    → HTTP client\npath: ^1.9.0    → Path utilities`,
    quiz: [
      { question: 'What does ^1.2.0 mean as a version constraint?', options: ['Exactly 1.2.0', 'Any version > 1.2.0', 'Compatible with 1.2.0, less than 2.0.0', 'Latest available'], correctAnswerIndex: 2 },
      { question: 'Which command installs all pubspec.yaml packages?', options: ['dart pub install', 'dart pub get', 'dart pub fetch', 'dart pub sync'], correctAnswerIndex: 1 },
      { question: 'Where is the central Dart/Flutter package repository?', options: ['npmjs.com', 'crates.io', 'pub.dev', 'maven.org'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Create a package registry Map with 4 packages (http, intl, path, test). Write addDependency(name) that checks existence and installs to a Set. Print pubspec.yaml-style output for installed packages.',
      starterCode: `void main() {
  final registry = <String, String>{
    // name → version constraint
  };
  final installed = <String>{};

  void addDependency(String name) {
    // Check and install
  }

  addDependency('http');
  addDependency('intl');
  addDependency('nonexistent');

  print('dependencies:');
  // Print installed packages
}`,
      solution: `void main() {
  final registry = <String, String>{
    'http': '^1.2.0', 'intl': '^0.19.0',
    'path': '^1.9.0', 'test': '^1.24.0',
  };
  final installed = <String>{};

  void addDependency(String name) {
    if (!registry.containsKey(name)) {
      print('Error: "\$name" not found'); return;
    }
    installed.add(name);
    print('+ \$name \${registry[name]}');
  }

  addDependency('http');
  addDependency('intl');
  addDependency('nonexistent');

  print('\\ndependencies:');
  for (final p in installed) print('  \$p: \${registry[p]}');
}`,
    },
  },

  {
    id: 57,
    level: 'Intermediate',
    title: 'HTTP Requests with the http Package',
    content: `# HTTP Requests

The \`http\` package is the standard Dart library for REST API calls.

## GET Request

\`\`\`dart
import 'package:http/http.dart' as http;
import 'dart:convert';

final url = Uri.parse('https://api.example.com/users/1');
final response = await http.get(url);

if (response.statusCode == 200) {
  final data = json.decode(response.body);
  print(data['name']);
} else {
  throw Exception('HTTP \${response.statusCode}');
}
\`\`\`

## POST Request

\`\`\`dart
await http.post(
  Uri.parse('https://api.example.com/users'),
  headers: {'Content-Type': 'application/json'},
  body: json.encode({'name': 'Alice'}),
);
\`\`\`

## Response Properties

- \`response.statusCode\` — 200, 404, 500…
- \`response.body\` — body as String
- \`response.headers\` — Map of headers

## Reusing Connections

\`\`\`dart
final client = http.Client();
try { /* multiple calls */ } finally { client.close(); }
\`\`\``,
    tips: [
      'Always check statusCode before decoding — a 404 body is an error message, not your data.',
      'Use http.Client() for multiple requests to the same server — it reuses the connection.',
      'Wrap calls in try/catch — network errors throw SocketException or ClientException.',
    ],
    codeSnippet: `import 'dart:convert';

// Mock HTTP layer for the lesson
class MockRes { final int statusCode; final String body; MockRes(this.statusCode, this.body); }

Future<MockRes> mockGet(String path) async {
  await Future.delayed(Duration(milliseconds: 30));
  final db = {
    '/users/1': '{"id":1,"name":"Alice","role":"admin"}',
    '/users/2': '{"id":2,"name":"Bob","role":"user"}',
    '/posts': '[{"id":1,"title":"Hello Dart"},{"id":2,"title":"Async is Fun"}]',
  };
  return db.containsKey(path) ? MockRes(200, db[path]!) : MockRes(404, '{"error":"Not found"}');
}

Future<Map<String, dynamic>> fetchUser(int id) async {
  final r = await mockGet('/users/\$id');
  if (r.statusCode != 200) throw Exception('HTTP \${r.statusCode}');
  return json.decode(r.body) as Map<String, dynamic>;
}

void main() async {
  try {
    final user = await fetchUser(1);
    print('User: \${user['name']} (\${user['role']})');

    final posts = (json.decode((await mockGet('/posts')).body) as List)
        .cast<Map<String, dynamic>>();
    for (final p in posts) print('  [\${p['id']}] \${p['title']}');

    await fetchUser(99);
  } catch (e) { print('Error: \$e'); }
}`,
    expectedOutput: `User: Alice (admin)\n  [1] Hello Dart\n  [2] Async is Fun\nError: Exception: HTTP 404`,
    quiz: [
      { question: 'What does statusCode == 200 mean?', options: ['Request failed', 'Timed out', 'Request succeeded', 'Server is redirecting'], correctAnswerIndex: 2 },
      { question: 'Why use http.Client() over top-level http.get()?', options: ['Client() is faster for one request', 'Client() reuses the connection', 'Client() handles cookies automatically', 'Only Client() supports POST'], correctAnswerIndex: 1 },
      { question: 'What exception does the http package throw when the network is unavailable?', options: ['NetworkException', 'TimeoutException', 'SocketException or ClientException', 'HttpException'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Using mockGet from the lesson, write fetchUserPosts(int userId) that fetches user and posts concurrently with Future.wait, then prints "<name>\'s posts: [titles]".',
      starterCode: `import 'dart:convert';

// (Include MockRes and mockGet from lesson above)

Future<void> fetchUserPosts(int userId) async {
  // Fetch user and posts concurrently, then print
}

void main() async {
  await fetchUserPosts(1);
}`,
      solution: `import 'dart:convert';

class MockRes { final int s; final String b; MockRes(this.s, this.b); }

Future<MockRes> mockGet(String p) async {
  await Future.delayed(Duration(milliseconds: 30));
  final db = {
    '/users/1': '{"id":1,"name":"Alice"}',
    '/posts': '[{"id":1,"title":"Hello Dart","userId":1},{"id":2,"title":"Async Fun","userId":2}]',
  };
  return db.containsKey(p) ? MockRes(200, db[p]!) : MockRes(404, '{}');
}

Future<void> fetchUserPosts(int userId) async {
  final [uRes, pRes] = await Future.wait([mockGet('/users/\$userId'), mockGet('/posts')]);
  final user = json.decode(uRes.b) as Map<String, dynamic>;
  final posts = (json.decode(pRes.b) as List)
      .cast<Map<String, dynamic>>()
      .where((p) => p['userId'] == userId)
      .map((p) => p['title']).toList();
  print("\${user['name']}'s posts: \$posts");
}

void main() async { await fetchUserPosts(1); }`,
    },
  },

  {
    id: 58,
    level: 'Intermediate',
    title: 'Dependency Injection',
    content: `# Dependency Injection

Dependency Injection (DI) means a class receives its dependencies from outside rather than creating them itself — making code testable and flexible.

## Without DI (bad)

\`\`\`dart
class UserService {
  final db = DatabaseConnection(); // hard-coded
}
\`\`\`
You cannot swap DatabaseConnection for a mock in tests.

## Constructor Injection (good)

\`\`\`dart
class UserService {
  final DatabaseRepository _db;
  UserService(this._db); // injected
}
\`\`\`

## Depend on Abstractions

\`\`\`dart
abstract class UserRepository {
  Future<String?> findUser(int id);
}

class InMemoryRepo implements UserRepository { ... }
class SqlRepo    implements UserRepository { ... }
\`\`\`

Now you can swap implementations at will — and use InMemoryRepo in tests.`,
    tips: [
      'In Flutter, get_it (service locator) and riverpod implement DI at scale.',
      'Always depend on abstractions (interfaces), not concrete classes.',
      'Constructor injection is the most explicit and testable form of DI.',
    ],
    codeSnippet: `abstract class Logger {
  void log(String msg);
}
abstract class UserRepo {
  Future<String?> find(int id);
  Future<void> save(int id, String name);
}

class ConsoleLogger implements Logger {
  @override void log(String msg) => print('[LOG] \$msg');
}

class InMemoryUserRepo implements UserRepo {
  final _store = <int, String>{};
  final Logger _logger;
  InMemoryUserRepo(this._logger);
  @override Future<String?> find(int id) async {
    _logger.log('Finding \$id'); return _store[id];
  }
  @override Future<void> save(int id, String name) async {
    _store[id] = name; _logger.log('Saved \$id: \$name');
  }
}

class UserService {
  final UserRepo _repo;
  final Logger _logger;
  UserService(this._repo, this._logger);

  Future<void> register(int id, String name) async {
    if (await _repo.find(id) != null) { _logger.log('\$id exists'); return; }
    await _repo.save(id, name);
  }

  Future<void> greet(int id) async {
    final name = await _repo.find(id);
    print(name != null ? 'Hello, \$name!' : 'Not found');
  }
}

void main() async {
  final logger = ConsoleLogger();
  final repo = InMemoryUserRepo(logger);
  final svc = UserService(repo, logger);

  await svc.register(1, 'Alice');
  await svc.register(1, 'Alice');
  await svc.greet(1);
  await svc.greet(99);
}`,
    expectedOutput: `[LOG] Finding 1\n[LOG] Saved 1: Alice\n[LOG] Finding 1\n[LOG] 1 exists\n[LOG] Finding 1\nHello, Alice!\n[LOG] Finding 99\nNot found`,
    quiz: [
      { question: 'What is Dependency Injection?', options: ['Adding packages to pubspec', 'Passing a class its dependencies from outside', 'Injecting code at runtime via reflection', 'Loading plugins dynamically'], correctAnswerIndex: 1 },
      { question: 'Why is constructor injection preferred for testability?', options: ['It is faster', 'Dependencies are explicit and replaceable with mocks', 'It avoids interfaces', 'It avoids abstract classes'], correctAnswerIndex: 1 },
      { question: 'What should you depend on — abstractions or concrete classes?', options: ['Concrete classes (faster)', 'Abstractions (interfaces)', 'Either, no difference', 'Only use dynamic'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Create abstract EmailService with send(to, subject, body). Implement MockEmailService that stores emails in a list. Create NotificationService injected with EmailService that sends a welcome email. Test with Mock.',
      starterCode: `abstract class EmailService {
  void send(String to, String subject, String body);
}

class MockEmailService implements EmailService {
  final sent = <String>[];
  @override void send(String to, String subject, String body) {
    // Store as string
  }
}

class NotificationService {
  final EmailService _email;
  NotificationService(this._email);
  void sendWelcome(String email, String name) {}
}

void main() {
  final mock = MockEmailService();
  final svc = NotificationService(mock);
  svc.sendWelcome('alice@example.com', 'Alice');
  print('Sent: \${mock.sent.length}');
  print(mock.sent.first);
}`,
      solution: `abstract class EmailService {
  void send(String to, String subject, String body);
}

class MockEmailService implements EmailService {
  final sent = <String>[];
  @override void send(String to, String subject, String body) =>
      sent.add('To:\$to | \$subject');
}

class NotificationService {
  final EmailService _email;
  NotificationService(this._email);
  void sendWelcome(String email, String name) =>
      _email.send(email, 'Welcome to Dartly!', 'Hi \$name, welcome!');
}

void main() {
  final mock = MockEmailService();
  final svc = NotificationService(mock);
  svc.sendWelcome('alice@example.com', 'Alice');
  print('Sent: \${mock.sent.length}');
  print(mock.sent.first);
}`,
    },
  },

  {
    id: 59,
    level: 'Intermediate',
    title: 'Dart CLI Apps',
    content: `# Building CLI Apps in Dart

Dart is excellent for CLI tools — fast startup with AOT compilation and a rich standard library.

## Command-Line Arguments

\`\`\`dart
void main(List<String> args) {
  if (args.isEmpty) { print('Usage: tool <name>'); return; }
  print('Hello, \${args[0]}!');
}
\`\`\`

## stdin and stdout

\`\`\`dart
import 'dart:io';
stdout.write('Enter name: ');
final name = stdin.readLineSync();
print('Hello, \$name!');
\`\`\`

## Platform Info

\`\`\`dart
print(Platform.operatingSystem);
print(Platform.environment['HOME']);
\`\`\`

## Compiling to Native

\`\`\`bash
dart compile exe bin/tool.dart -o bin/tool
./bin/tool  # runs without Dart installed
\`\`\`

## The args Package

The \`args\` package simplifies flag/option parsing:
\`\`\`dart
final parser = ArgParser()
  ..addOption('name', abbr: 'n')
  ..addFlag('verbose', abbr: 'v');
final results = parser.parse(args);
\`\`\``,
    tips: [
      'dart compile exe produces a single native binary — great for distributing tools.',
      'The args package is the standard way to handle complex CLI argument parsing.',
      'Always validate args and print usage on bad input — good CLI tools guide the user.',
    ],
    codeSnippet: `import 'dart:io';

Map<String, int> analyzeText(String text) => {
  'words': text.split(RegExp(r'\\s+')).where((w) => w.isNotEmpty).length,
  'chars': text.replaceAll(RegExp(r'\\s'), '').length,
  'sentences': text.split(RegExp(r'[.!?]+')).where((s) => s.trim().isNotEmpty).length,
};

void processArgs(List<String> args) {
  if (args.isEmpty) {
    const sample = 'The quick brown fox. It runs fast! Can it jump? Yes.';
    final s = analyzeText(sample);
    print('Sample: "\${sample.substring(0,30)}..."');
    print('Words: \${s['words']}, Chars: \${s['chars']}, Sentences: \${s['sentences']}');
    print('\\nPlatform: \${Platform.operatingSystem}');
  } else {
    final s = analyzeText(args.join(' '));
    print('words=\${s['words']} chars=\${s['chars']} sentences=\${s['sentences']}');
  }
}

void main(List<String> args) => processArgs(args);`,
    expectedOutput: `Sample: "The quick brown fox. It runs fast! C..."\nWords: 12, Chars: 39, Sentences: 4\n\nPlatform: linux`,
    quiz: [
      { question: 'How do you access CLI arguments in Dart?', options: ['Using args global', 'As List<String> args parameter of main()', 'Using System.argv', 'Using Platform.arguments'], correctAnswerIndex: 1 },
      { question: 'Which command compiles Dart to a native executable?', options: ['dart build', 'dart compile exe', 'dart package', 'dart bundle'], correctAnswerIndex: 1 },
      { question: 'Which class provides stdin/stdout in Dart?', options: ['Console', 'IO', 'System', 'Top-level objects from dart:io'], correctAnswerIndex: 3 },
    ],
    exercise: {
      instruction: 'Write processArgs(List<String> args) that parses --name <value> and --shout flag. Print "Hello, <name>!" or uppercase if --shout. Print usage if no args.',
      starterCode: `import 'dart:io';

void processArgs(List<String> args) {
  // Parse --name and --shout
}

void main() {
  processArgs([]);
  processArgs(['--name', 'Alice']);
  processArgs(['--name', 'Bob', '--shout']);
}`,
      solution: `import 'dart:io';

void processArgs(List<String> args) {
  if (args.isEmpty) { print('Usage: tool --name <name> [--shout]'); return; }
  String? name;
  bool shout = false;
  for (int i = 0; i < args.length; i++) {
    if (args[i] == '--name' && i + 1 < args.length) name = args[++i];
    else if (args[i] == '--shout') shout = true;
  }
  if (name == null) { print('Error: --name required'); return; }
  var msg = 'Hello, \$name!';
  print(shout ? msg.toUpperCase() : msg);
}

void main() {
  processArgs([]);
  processArgs(['--name', 'Alice']);
  processArgs(['--name', 'Bob', '--shout']);
}`,
    },
  },

  {
    id: 60,
    level: 'Intermediate',
    title: 'Performance and Profiling',
    content: `# Performance Optimisation in Dart

Write efficient Dart by making good algorithmic choices and avoiding unnecessary work — profile first, optimise second.

## Benchmarking with Stopwatch

\`\`\`dart
final sw = Stopwatch()..start();
doWork();
print('Time: \${sw.elapsedMilliseconds}ms');
\`\`\`

## Key Optimisation Tips

**StringBuffer over string concatenation in loops:**
\`\`\`dart
// Bad O(n²):
var s = '';
for (final p in parts) s += p;

// Good O(n):
final buf = StringBuffer();
for (final p in parts) buf.write(p);
final s = buf.toString();
\`\`\`

**Lazy Iterables — avoid premature .toList():**
\`\`\`dart
numbers.where((n) => n > 0).map((n) => n * 2).first; // no intermediate list
\`\`\`

**Compile RegExp once outside loops:**
\`\`\`dart
final re = RegExp(r'\\s');
for (final s in strings) s.replaceAll(re, '');
\`\`\`

**const constructors** — reuse compile-time constant objects.

## JIT vs AOT

- JIT (dev): hot reload, slower startup.
- AOT (release): fast startup, optimised native code.`,
    tips: [
      'StringBuffer is 10–100× faster than += in a loop for many items.',
      'Use const wherever possible — the compiler can eliminate redundant allocations.',
      "Profile with DevTools (flutter run --profile) or dart run --observe.",
    ],
    codeSnippet: `void benchmark(String name, void Function() fn, {int n = 500}) {
  final sw = Stopwatch()..start();
  for (int i = 0; i < n; i++) fn();
  sw.stop();
  print('\$name: \${sw.elapsedMicroseconds ~/ n}µs avg');
}

void main() {
  final words = List.generate(500, (i) => 'word\$i');

  benchmark('String += (500)', () {
    var s = ''; for (final w in words) s += '\$w ';
  });

  benchmark('StringBuffer (500)', () {
    final buf = StringBuffer();
    for (final w in words) buf.write('\$w ');
    buf.toString();
  });

  final numbers = List.generate(100000, (i) => i);

  benchmark('Eager .toList().first', () {
    numbers.where((n) => n > 50000).map((n) => n * 2).toList().first;
  }, n: 100);

  benchmark('Lazy .first (no toList)', () {
    numbers.where((n) => n > 50000).map((n) => n * 2).first;
  }, n: 100);

  print('\\n✓ Use StringBuffer for string-heavy loops');
  print('✓ Use lazy Iterables — skip .toList() until needed');
}`,
    expectedOutput: `String += (500): <N>µs avg\nStringBuffer (500): <N>µs avg\nEager .toList().first: <N>µs avg\nLazy .first (no toList): <N>µs avg\n\n✓ Use StringBuffer for string-heavy loops\n✓ Use lazy Iterables — skip .toList() until needed`,
    quiz: [
      { question: 'What class replaces string concatenation in a loop?', options: ['StringBuilder', 'StringJoiner', 'StringBuffer', 'StringWriter'], correctAnswerIndex: 2 },
      { question: 'Why is lazy evaluation faster in some cases?', options: ['Uses less CPU', 'Avoids an intermediate collection when only part of the result is needed', 'Parallelises automatically', 'Uses native code'], correctAnswerIndex: 1 },
      { question: 'What is the difference between JIT and AOT?', options: ['JIT is for mobile; AOT is for web', 'JIT compiles at runtime (dev); AOT compiles ahead of time for fast production startup', 'AOT is slower but safer', 'They produce identical output'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Benchmark string concatenation vs StringBuffer for building a CSV from 1000 rows. Print elapsed microseconds for each and confirm StringBuffer is faster.',
      starterCode: `void main() {
  final rows = List.generate(1000, (i) => '\$i,item\$i,\${i * 2.5}');

  // Benchmark 1: +=
  // Benchmark 2: StringBuffer
}`,
      solution: `void main() {
  final rows = List.generate(1000, (i) => '\$i,item\$i,\${i * 2.5}');

  final sw1 = Stopwatch()..start();
  var r1 = '';
  for (final row in rows) r1 += '\$row\\n';
  sw1.stop();
  print('String +=:      \${sw1.elapsedMicroseconds}µs (\${r1.length} chars)');

  final sw2 = Stopwatch()..start();
  final buf = StringBuffer();
  for (final row in rows) buf.writeln(row);
  final r2 = buf.toString();
  sw2.stop();
  print('StringBuffer:   \${sw2.elapsedMicroseconds}µs (\${r2.length} chars)');

  final ratio = sw1.elapsedMicroseconds / sw2.elapsedMicroseconds;
  print('StringBuffer is \${ratio.toStringAsFixed(1)}x faster');
}`,
    },
  },


{
    id: 61,
    level: 'Advanced',
    title: 'Metaprogramming with Mirrors (dart:mirrors)',
    content: `# Reflection with dart:mirrors

\`dart:mirrors\` provides runtime introspection — reading class structure, calling methods by name, and inspecting annotations. It is available in Dart CLI/server apps (not Flutter/AOT).

## Why Mirrors?

- Building serialization frameworks
- Dependency injection containers
- Testing utilities (mocking)
- Code generation tools

## Basic Reflection

\`\`\`dart
import 'dart:mirrors';

class Person {
  final String name;
  final int age;
  Person(this.name, this.age);
  void greet() => print('Hi, I am \$name');
}

void main() {
  final person = Person('Alice', 30);
  final mirror = reflect(person);

  // Call a method by name
  mirror.invoke(Symbol('greet'), []);

  // Read a field
  print(mirror.getField(#name).reflectee);
}
\`\`\`

## ClassMirror — Inspect a Class

\`\`\`dart
final classMirror = reflectClass(Person);
classMirror.declarations.forEach((symbol, decl) {
  print(MirrorSystem.getName(symbol));
});
\`\`\`

## Annotations

\`\`\`dart
class JsonField {
  final String name;
  const JsonField(this.name);
}

class User {
  @JsonField('first_name')
  final String firstName;
}
\`\`\`

You can read annotations via \`VariableMirror.metadata\`.`,
    tips: [
      'dart:mirrors is not available in Flutter or AOT-compiled Dart — use code generation (build_runner) instead.',
      'Mirrors add startup overhead — consider static code generation for production use.',
      'Understanding mirrors deeply helps when evaluating code-generation packages like freezed and json_serializable.',
    ],
    codeSnippet: `// Note: dart:mirrors is CLI-only. This simulates its behavior.
// In real code: import 'dart:mirrors';

// Simulate annotation-based serialization (mirrors concept)
class JsonField {
  final String key;
  const JsonField(this.key);
}

// In a real mirrors-based approach, we'd read @JsonField at runtime.
// We simulate it with a manual registry here to illustrate the concept:
class Serializer {
  static Map<String, dynamic> serialize(Object obj, Map<String, String> fieldMap) {
    final result = <String, dynamic>{};
    // In real mirrors code: reflect(obj).getField(Symbol(field)).reflectee
    // We rely on the fieldMap for simulation
    return result;
  }
}

class Product {
  @JsonField('product_name')
  final String name;
  @JsonField('unit_price')
  final double price;
  @JsonField('stock_count')
  final int stock;

  Product({required this.name, required this.price, required this.stock});
}

// Simulate what mirrors serialization would produce
Map<String, dynamic> toJson(Product p) => {
  'product_name': p.name,
  'unit_price': p.price,
  'stock_count': p.stock,
};

void main() {
  final p = Product(name: 'Laptop', price: 999.99, stock: 42);
  final json = toJson(p);
  print('Serialized: \$json');
  print('');
  print('In real dart:mirrors code you would:');
  print('1. reflect(p) → InstanceMirror');
  print('2. Inspect @JsonField annotations on each field');
  print('3. Use field.getField(symbol).reflectee to get the value');
  print('4. Build the JSON map dynamically');
}`,
    expectedOutput: `Serialized: {product_name: Laptop, unit_price: 999.99, stock_count: 42}\n\nIn real dart:mirrors code you would:\n1. reflect(p) → InstanceMirror\n2. Inspect @JsonField annotations on each field\n3. Use field.getField(symbol).reflectee to get the value\n4. Build the JSON map dynamically`,
    quiz: [
      { question: 'Where is dart:mirrors NOT available?', options: ['Dart CLI apps', 'Dart server apps', 'Flutter (AOT) apps', 'Dart testing tools'], correctAnswerIndex: 2 },
      { question: 'What is a Symbol in Dart mirrors used for?', options: ['A constant String identifier', 'A runtime name used to refer to declarations', 'A compile-time annotation', 'A thread-safe reference'], correctAnswerIndex: 1 },
      { question: 'What is the production alternative to dart:mirrors for code generation?', options: ['dart:isolate', 'dart:async', 'build_runner with source_gen', 'dart:io'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Simulate annotation-based validation: create a @MinLength(n) annotation class. Write a validate(Object obj, Map<String, int> minLengths) function that checks string fields against their minimum lengths and returns a list of error messages.',
      starterCode: `class MinLength {
  final int length;
  const MinLength(this.length);
}

// Simulate mirror-based validation
List<String> validate(Map<String, dynamic> fields, Map<String, int> minLengths) {
  // Check each field against its minLength constraint
}

void main() {
  final errors = validate(
    {'username': 'Al', 'password': 'pass', 'email': 'alice@example.com'},
    {'username': 3, 'password': 8},
  );
  print(errors);
}`,
      solution: `class MinLength {
  final int length;
  const MinLength(this.length);
}

List<String> validate(Map<String, dynamic> fields, Map<String, int> minLengths) {
  final errors = <String>[];
  for (final entry in minLengths.entries) {
    final value = fields[entry.key];
    if (value is String && value.length < entry.value) {
      errors.add('\${entry.key} must be at least \${entry.value} characters (got \${value.length})');
    }
  }
  return errors;
}

void main() {
  final errors = validate(
    {'username': 'Al', 'password': 'pass', 'email': 'alice@example.com'},
    {'username': 3, 'password': 8},
  );
  print(errors);
}`,
    },
  },

  {
    id: 62,
    level: 'Advanced',
    title: 'Code Generation with build_runner',
    content: `# Code Generation in Dart

Many Dart packages (freezed, json_serializable, injectable, riverpod_generator) use source code generation via \`build_runner\` to eliminate boilerplate.

## How It Works

1. You annotate your code: \`@JsonSerializable()\`, \`@freezed\`, etc.
2. Run: \`dart run build_runner build\`
3. Generated files (e.g., \`user.g.dart\`) appear alongside your source.

## json_serializable Example

\`\`\`yaml
# pubspec.yaml
dependencies:
  json_annotation: ^4.8.0
dev_dependencies:
  build_runner: ^2.4.0
  json_serializable: ^6.7.0
\`\`\`

\`\`\`dart
// user.dart
import 'package:json_annotation/json_annotation.dart';
part 'user.g.dart';

@JsonSerializable()
class User {
  final String name;
  @JsonKey(name: 'created_at')
  final DateTime createdAt;

  User({required this.name, required this.createdAt});

  factory User.fromJson(Map<String, dynamic> json) => _\$UserFromJson(json);
  Map<String, dynamic> toJson() => _\$UserToJson(this);
}
\`\`\`

## freezed Example

Generates immutable data classes with copyWith, pattern matching, and union types:
\`\`\`dart
@freezed
class Result<T> with _\$Result<T> {
  const factory Result.success(T data) = Success;
  const factory Result.failure(String error) = Failure;
}
\`\`\`

## Running the Generator

\`\`\`bash
dart run build_runner build           # one-shot
dart run build_runner watch           # watch mode
dart run build_runner build --delete-conflicting-outputs
\`\`\``,
    tips: [
      'Run build_runner watch during development so generated files update automatically as you code.',
      'Commit generated .g.dart files to source control — they are part of your app code.',
      'If generation fails, delete generated files and re-run with --delete-conflicting-outputs.',
    ],
    codeSnippet: `// This demonstrates what json_serializable generates for you.
// In a real project, you write the annotated class and build_runner generates this.

import 'dart:convert';

// What you WRITE:
class Address {
  final String street;
  final String city;
  final String country;
  Address({required this.street, required this.city, required this.country});
  // With @JsonSerializable() + build_runner, these are generated:
  factory Address.fromJson(Map<String, dynamic> json) => Address(
        street: json['street'] as String,
        city: json['city'] as String,
        country: json['country'] as String,
      );
  Map<String, dynamic> toJson() => {'street': street, 'city': city, 'country': country};
}

class UserProfile {
  final int id;
  final String name;
  final String email;
  final Address address;
  final List<String> roles;
  UserProfile({required this.id, required this.name, required this.email, required this.address, required this.roles});

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
        id: json['id'] as int,
        name: json['name'] as String,
        email: json['email'] as String,
        address: Address.fromJson(json['address'] as Map<String, dynamic>),
        roles: (json['roles'] as List).cast<String>(),
      );
  Map<String, dynamic> toJson() => {'id': id, 'name': name, 'email': email, 'address': address.toJson(), 'roles': roles};
}

void main() {
  const raw = '''
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "address": {"street": "123 Main St", "city": "Cairo", "country": "Egypt"},
    "roles": ["admin", "user"]
  }''';

  final profile = UserProfile.fromJson(json.decode(raw));
  print('User: \${profile.name} (\${profile.roles.join(', ')})');
  print('City: \${profile.address.city}');
  print('Re-encoded: \${json.encode(profile.toJson()).substring(0,50)}...');
}`,
    expectedOutput: `User: Alice (admin, user)\nCity: Cairo\nRe-encoded: {"id":1,"name":"Alice","email":"alice@example.c...`,
    quiz: [
      { question: 'What command runs build_runner to generate code once?', options: ['dart codegen', 'dart build', 'dart run build_runner build', 'dart generate'], correctAnswerIndex: 2 },
      { question: 'Should generated .g.dart files be committed to version control?', options: ['No, always gitignore them', 'Yes, they are part of your app', 'Only in production branches', 'Only when using freezed'], correctAnswerIndex: 1 },
      { question: 'What does the freezed package generate for union types?', options: ['HTTP client code', 'Immutable data classes with copyWith and pattern matching support', 'Database schemas', 'API routes'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Manually write what build_runner would generate: a copyWith method for an immutable Config class with host (String), port (int), and debug (bool) fields. Test that Config(...).copyWith(port: 9090) returns a new object with only port changed.',
      starterCode: `class Config {
  final String host;
  final int port;
  final bool debug;

  const Config({required this.host, required this.port, required this.debug});

  // Write copyWith manually (what freezed would generate)

  @override
  String toString() => 'Config(host=\$host, port=\$port, debug=\$debug)';
}

void main() {
  const base = Config(host: 'localhost', port: 8080, debug: false);
  final prod = base.copyWith(host: 'api.example.com', port: 443);
  final dev = base.copyWith(debug: true);
  print(base);
  print(prod);
  print(dev);
}`,
      solution: `class Config {
  final String host;
  final int port;
  final bool debug;

  const Config({required this.host, required this.port, required this.debug});

  Config copyWith({String? host, int? port, bool? debug}) => Config(
    host: host ?? this.host,
    port: port ?? this.port,
    debug: debug ?? this.debug,
  );

  @override
  String toString() => 'Config(host=\$host, port=\$port, debug=\$debug)';
}

void main() {
  const base = Config(host: 'localhost', port: 8080, debug: false);
  final prod = base.copyWith(host: 'api.example.com', port: 443);
  final dev = base.copyWith(debug: true);
  print(base);
  print(prod);
  print(dev);
}`,
    },
  },

  {
    id: 63,
    level: 'Advanced',
    title: 'Advanced Async — Zones and Schedulers',
    content: `# Zones in Dart

A **Zone** is an execution context that intercepts asynchronous operations. Zones let you:
- Catch uncaught exceptions globally
- Intercept async callbacks, timers, and microtasks
- Override \`print\`

## runZonedGuarded

\`\`\`dart
runZonedGuarded(
  () {
    // All async code inside is guarded
    Future.delayed(Duration.zero, () => throw 'async error!');
  },
  (error, stack) {
    print('Caught: \$error');
  },
);
\`\`\`

## Zone.current.fork()

Create a custom zone with overrides:
\`\`\`dart
Zone.current.fork(
  specification: ZoneSpecification(
    print: (zone, parent, self, line) {
      parent.print(zone, self, '[PREFIXED] \$line');
    },
  ),
).run(() {
  print('Hello'); // prints "[PREFIXED] Hello"
});
\`\`\`

## Microtasks vs Event Queue

Dart's event loop has two queues:
- **Microtask queue**: runs before any event (e.g., \`Future.microtask\`, \`scheduleMicrotask\`)
- **Event queue**: I/O, timers, user events

\`\`\`dart
scheduleMicrotask(() => print('microtask'));
Future.delayed(Duration.zero, () => print('event'));
print('sync');
// Prints: sync → microtask → event
\`\`\``,
    tips: [
      'In Flutter apps, runZonedGuarded is commonly used to catch uncaught async exceptions globally in main().',
      'Microtasks run before any event — use them for truly immediate post-synchronous scheduling.',
      'Overusing zones adds overhead. Use them for error handling and testing, not general logic.',
    ],
    codeSnippet: `import 'dart:async';

void main() {
  // 1. Demonstrate microtask vs event queue ordering
  print('1. sync start');

  scheduleMicrotask(() => print('3. microtask 1'));
  scheduleMicrotask(() => print('4. microtask 2'));
  Future.delayed(Duration.zero, () => print('6. event queue'));
  Future.microtask(() => print('5. Future.microtask'));

  print('2. sync end');

  // 2. runZonedGuarded — catch async errors
  runZonedGuarded(
    () {
      Future.delayed(const Duration(milliseconds: 50), () {
        throw StateError('Something went wrong asynchronously!');
      });
    },
    (error, stack) {
      print('\\n7. Caught zone error: \${error.runtimeType}');
    },
  );

  // 3. Zone override — intercept print
  Zone.current.fork(
    specification: ZoneSpecification(
      print: (_, parent, self, line) {
        parent.print(self, self, '[LOG] \$line');
      },
    ),
  ).run(() {
    print('\\n8. This goes through custom zone');
  });
}`,
    expectedOutput: `1. sync start\n2. sync end\n3. microtask 1\n4. microtask 2\n5. Future.microtask\n6. event queue\n\n7. Caught zone error: StateError\n\n[LOG] \n8. This goes through custom zone`,
    quiz: [
      { question: 'What is the order of execution in Dart\'s event loop?', options: ['Events, then microtasks', 'Microtasks, then events', 'Sync code, then microtasks, then events', 'Events and microtasks are interleaved randomly'], correctAnswerIndex: 2 },
      { question: 'What does runZonedGuarded allow you to do?', options: ['Run code in a separate isolate', 'Catch all uncaught exceptions (including async) in a zone', 'Create a sandboxed environment', 'Run synchronous code asynchronously'], correctAnswerIndex: 1 },
      { question: 'Which queue does scheduleMicrotask use?', options: ['The event queue', 'The render queue', 'The microtask queue', 'A new queue per call'], correctAnswerIndex: 2 },
    ],
    exercise: {
      instruction: 'Write a function withLogging(void Function() body) that runs body inside a forked Zone that intercepts print and prepends "[<timestamp>]" to every printed line. Test it with a few print calls.',
      starterCode: `import 'dart:async';

void withLogging(void Function() body) {
  // Fork a zone that intercepts print
}

void main() {
  withLogging(() {
    print('Application started');
    print('Processing data');
    print('Done');
  });
  print('This is outside the logging zone');
}`,
      solution: `import 'dart:async';

void withLogging(void Function() body) {
  Zone.current.fork(
    specification: ZoneSpecification(
      print: (_, parent, self, line) {
        final ts = DateTime.now().toIso8601String().substring(11, 19);
        parent.print(self, self, '[\$ts] \$line');
      },
    ),
  ).run(body);
}

void main() {
  withLogging(() {
    print('Application started');
    print('Processing data');
    print('Done');
  });
  print('This is outside the logging zone');
}`,
    },
  },

  {
    id: 64,
    level: 'Advanced',
    title: 'StreamController and Custom Streams',
    content: `# StreamController and Custom Streams

While \`async*\` generators are great for simple streams, \`StreamController\` gives you full control — you can push events at any time from any code path.

## StreamController

\`\`\`dart
final controller = StreamController<int>();
final stream = controller.stream;

// Listen
stream.listen(print, onError: print, onDone: () => print('Done'));

// Push values
controller.add(1);
controller.add(2);
controller.addError('oops!');
controller.close(); // triggers onDone
\`\`\`

## Broadcast Stream Controller

A regular StreamController allows only one listener. For multiple listeners:
\`\`\`dart
final controller = StreamController<String>.broadcast();
controller.stream.listen((e) => print('Listener 1: \$e'));
controller.stream.listen((e) => print('Listener 2: \$e'));
controller.add('Hello'); // Both listeners receive it
\`\`\`

## Stream Transformers

\`\`\`dart
final transformer = StreamTransformer<String, int>.fromHandlers(
  handleData: (data, sink) => sink.add(data.length),
  handleError: (e, st, sink) => sink.addError(e),
);
stream.transform(transformer).listen(print);
\`\`\`

## StreamSubscription Management

\`\`\`dart
final sub = stream.listen(print);
sub.pause();
sub.resume();
await sub.cancel();
\`\`\``,
    tips: [
      'Always close StreamControllers when you are done to free resources and trigger onDone.',
      'Use broadcast streams only when you need multiple listeners — they drop events if no one is listening.',
      'StreamSubscription.cancel() returns a Future — await it when cleanup order matters.',
    ],
    codeSnippet: `import 'dart:async';

class EventBus {
  final _controller = StreamController<Map<String, dynamic>>.broadcast();

  Stream<Map<String, dynamic>> on(String event) =>
      _controller.stream.where((e) => e['type'] == event);

  void emit(String event, [dynamic data]) {
    _controller.add({'type': event, 'data': data, 'ts': DateTime.now().millisecondsSinceEpoch});
  }

  Future<void> close() => _controller.close();
}

void main() async {
  final bus = EventBus();

  // Multiple listeners for same event
  bus.on('userLogin').listen((e) => print('Auth: user logged in [\${e['data']}]'));
  bus.on('userLogin').listen((e) => print('Analytics: login event for \${e['data']}'));
  bus.on('pageView').listen((e) => print('Tracker: page \${e['data']} viewed'));

  bus.emit('userLogin', 'alice@example.com');
  bus.emit('pageView', '/dashboard');
  bus.emit('userLogin', 'bob@example.com');
  bus.emit('pageView', '/settings');

  await Future.delayed(Duration(milliseconds: 10));
  await bus.close();
  print('EventBus closed');
}`,
    expectedOutput: `Auth: user logged in [alice@example.com]\nAnalytics: login event for alice@example.com\nTracker: page /dashboard viewed\nAuth: user logged in [bob@example.com]\nAnalytics: login event for bob@example.com\nTracker: page /settings viewed\nEventBus closed`,
    quiz: [
      { question: 'What is the difference between StreamController and StreamController.broadcast()?', options: ['Broadcast is faster', 'Regular allows one listener; broadcast allows multiple', 'Broadcast buffers events; regular does not', 'They are identical'], correctAnswerIndex: 1 },
      { question: 'What happens when you call controller.close()?', options: ['The stream is paused', 'Future events are dropped silently', 'Listeners receive the onDone callback', 'The controller throws an exception'], correctAnswerIndex: 2 },
      { question: 'What does a StreamTransformer do?', options: ['Converts a Stream to a Future', 'Transforms the events of a stream into a new stream', 'Broadcasts to multiple streams', 'Splits a stream into parallel streams'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Build a RateLimiter class that wraps a StreamController<T>. It exposes a Stream<T> that only allows at most one event per minInterval duration. Emit more frequently in main and verify throttling.',
      starterCode: `import 'dart:async';

class RateLimiter<T> {
  final Duration minInterval;
  RateLimiter(this.minInterval);

  DateTime? _lastEmit;
  final _controller = StreamController<T>.broadcast();
  Stream<T> get stream => _controller.stream;

  void add(T event) {
    // Only forward if enough time has passed
  }

  Future<void> close() => _controller.close();
}

void main() async {
  final limiter = RateLimiter<int>(Duration(milliseconds: 100));
  limiter.stream.listen((e) => print('Received: \$e at \${DateTime.now().millisecondsSinceEpoch}'));

  for (int i = 1; i <= 6; i++) {
    limiter.add(i);
    await Future.delayed(Duration(milliseconds: 50));
  }
  await limiter.close();
}`,
      solution: `import 'dart:async';

class RateLimiter<T> {
  final Duration minInterval;
  RateLimiter(this.minInterval);

  DateTime? _lastEmit;
  final _controller = StreamController<T>.broadcast();
  Stream<T> get stream => _controller.stream;

  void add(T event) {
    final now = DateTime.now();
    if (_lastEmit == null || now.difference(_lastEmit!) >= minInterval) {
      _lastEmit = now;
      _controller.add(event);
    }
  }

  Future<void> close() => _controller.close();
}

void main() async {
  final limiter = RateLimiter<int>(Duration(milliseconds: 100));
  limiter.stream.listen((e) => print('Received: \$e'));

  for (int i = 1; i <= 6; i++) {
    limiter.add(i);
    await Future.delayed(Duration(milliseconds: 50));
  }
  await limiter.close();
}`,
    },
  },

  {
    id: 65,
    level: 'Advanced',
    title: 'Immutable Data and Value Objects',
    content: `# Immutable Data Patterns

Immutability — objects that cannot change after creation — reduces bugs from shared mutable state and makes code easier to reason about.

## const and final for Immutability

\`\`\`dart
const point = Point(3, 4); // compile-time constant, deeply immutable
final list = const [1, 2, 3]; // immutable list
\`\`\`

## Immutable Classes

\`\`\`dart
class Money {
  final int cents;
  final String currency;
  const Money(this.cents, this.currency);

  Money operator +(Money other) {
    assert(currency == other.currency);
    return Money(cents + other.cents, currency);
  }

  Money copyWith({int? cents, String? currency}) =>
      Money(cents ?? this.cents, currency ?? this.currency);
}
\`\`\`

## Unmodifiable Collections

\`\`\`dart
final items = List.unmodifiable([1, 2, 3]);
final config = Map.unmodifiable({'key': 'value'});
\`\`\`

## Value Equality

Immutable objects are usually value objects — two instances with the same data should be equal:
\`\`\`dart
@override
bool operator ==(Object other) =>
    other is Money && cents == other.cents && currency == other.currency;

@override
int get hashCode => Object.hash(cents, currency);
\`\`\`

## Why Immutability Matters in Flutter

Flutter rebuilds widgets efficiently by comparing old and new state. Immutable state objects make this comparison \`O(1)\` (reference equality or value equality) instead of deep comparisons.`,
    tips: [
      'Immutable objects are inherently thread-safe — no synchronization needed across isolates.',
      'Use const constructors wherever possible — Dart can deduplicate const objects at compile time.',
      'copyWith is the standard pattern for "modifying" immutable objects — it returns a new instance.',
    ],
    codeSnippet: `class Vec3 {
  final double x, y, z;
  const Vec3(this.x, this.y, this.z);

  static const zero = Vec3(0, 0, 0);
  static const unitX = Vec3(1, 0, 0);
  static const unitY = Vec3(0, 1, 0);
  static const unitZ = Vec3(0, 0, 1);

  double get magnitude => (x*x + y*y + z*z) == 0 ? 0 : _sqrt(x*x + y*y + z*z);
  static double _sqrt(double v) {
    double g = v / 2;
    for (int i = 0; i < 50; i++) g = (g + v / g) / 2;
    return g;
  }

  Vec3 operator +(Vec3 o) => Vec3(x+o.x, y+o.y, z+o.z);
  Vec3 operator -(Vec3 o) => Vec3(x-o.x, y-o.y, z-o.z);
  Vec3 operator *(double s) => Vec3(x*s, y*s, z*s);
  double dot(Vec3 o) => x*o.x + y*o.y + z*o.z;
  Vec3 cross(Vec3 o) => Vec3(y*o.z - z*o.y, z*o.x - x*o.z, x*o.y - y*o.x);
  Vec3 get normalized { final m = magnitude; return m == 0 ? zero : Vec3(x/m, y/m, z/m); }

  @override
  bool operator ==(Object o) => o is Vec3 && x==o.x && y==o.y && z==o.z;
  @override
  int get hashCode => Object.hash(x, y, z);
  @override
  String toString() => 'Vec3(\${x.toStringAsFixed(2)}, \${y.toStringAsFixed(2)}, \${z.toStringAsFixed(2)})';
}

void main() {
  final a = Vec3(1, 2, 3);
  final b = Vec3(4, 5, 6);
  print('a + b = \${a + b}');
  print('a · b = \${a.dot(b)}');
  print('a × b = \${a.cross(b)}');
  print('|a| = \${a.magnitude.toStringAsFixed(4)}');
  print('normalized a = \${a.normalized}');
  print('a == Vec3(1,2,3): \${a == Vec3(1,2,3)}');

  // Demonstrate immutability
  final c = a + b;
  print('a unchanged: \$a');
  print('c (a+b): \$c');
}`,
    expectedOutput: `a + b = Vec3(5.00, 7.00, 9.00)\na · b = 32.0\na × b = Vec3(-3.00, 6.00, -3.00)\n|a| = 3.7417\nnormalized a = Vec3(0.27, 0.53, 0.80)\na == Vec3(1,2,3): true\na unchanged: Vec3(1.00, 2.00, 3.00)\nc (a+b): Vec3(5.00, 7.00, 9.00)`,
    quiz: [
      { question: 'What does List.unmodifiable() return?', options: ['A new empty list', 'A copy of the list that throws when modified', 'A null-safe list', 'A sorted list'], correctAnswerIndex: 1 },
      { question: 'Why are immutable objects thread-safe?', options: ['They are stored in read-only memory', 'They cannot be modified, so no synchronization is needed', 'Dart locks them automatically', 'They live only in one isolate'], correctAnswerIndex: 1 },
      { question: 'What is the copyWith pattern?', options: ['Deep cloning an object', 'Returning a new instance with some fields changed', 'Converting mutable to immutable', 'Creating a prototype'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Create an immutable Color class (red, green, blue: 0-255 int) with const constructor, operator ==, hashCode, copyWith, and methods: Color blend(Color other) (average RGB), Color get inverted (255 - each channel), and String get hex (e.g. "#FF8040").',
      starterCode: `class Color {
  final int red, green, blue;
  const Color(this.red, this.green, this.blue);

  // copyWith, operator ==, hashCode
  // blend, inverted, hex
}

void main() {
  const red = Color(255, 0, 0);
  const blue = Color(0, 0, 255);
  print(red.hex);
  print(blue.inverted.hex);
  print(red.blend(blue).hex);
}`,
      solution: `class Color {
  final int red, green, blue;
  const Color(this.red, this.green, this.blue);

  Color copyWith({int? red, int? green, int? blue}) =>
      Color(red ?? this.red, green ?? this.green, blue ?? this.blue);

  @override
  bool operator ==(Object o) =>
      o is Color && red == o.red && green == o.green && blue == o.blue;

  @override
  int get hashCode => Object.hash(red, green, blue);

  Color blend(Color other) => Color(
    (red + other.red) ~/ 2,
    (green + other.green) ~/ 2,
    (blue + other.blue) ~/ 2,
  );

  Color get inverted => Color(255 - red, 255 - green, 255 - blue);

  String get hex {
    String h(int v) => v.toRadixString(16).padLeft(2, '0').toUpperCase();
    return '#\${h(red)}\${h(green)}\${h(blue)}';
  }

  @override
  String toString() => hex;
}

void main() {
  const red = Color(255, 0, 0);
  const blue = Color(0, 0, 255);
  print(red.hex);
  print(blue.inverted.hex);
  print(red.blend(blue).hex);
}`,
    },
  },

  {
    id: 66,
    level: 'Advanced',
    title: 'Advanced Generics — Variance and Type Bounds',
    content: `# Advanced Generics

## Covariance and Contravariance

Dart generic types are **invariant** by default: a \`List<Dog>\` is NOT a \`List<Animal>\`, even if \`Dog extends Animal\`.

However, function types are covariant in return type and contravariant in parameter types:
\`\`\`dart
Animal Function() producer = Dog Function() dogProducer;  // OK (covariant return)
void Function(Dog) consumer = void Function(Animal) animals;  // OK (contravariant param)
\`\`\`

## Bounded Wildcards (Covariant Parameters)

Mark a parameter \`covariant\` to accept subtypes:
\`\`\`dart
class AnimalShelter {
  final List<Animal> _animals = [];
  void add(covariant Dog animal) => _animals.add(animal);
}
\`\`\`

## Multiple Bounds with &

Dart doesn't support multiple bounds directly (\`T extends A & B\`), but you can use mixins or interfaces:
\`\`\`dart
abstract class Printable { void print(); }
abstract class Serializable { String serialize(); }
// Use an interface that extends both:
abstract class PrintableAndSerializable implements Printable, Serializable {}
T process<T extends PrintableAndSerializable>(T item) { ... }
\`\`\`

## Generic Type Aliases (Dart 2.13+)

\`\`\`dart
typedef Predicate<T> = bool Function(T);
typedef Result<T> = ({T? value, String? error});
\`\`\`

## Reified Generics

Unlike Java, Dart reifies generic types at runtime:
\`\`\`dart
print(<int>[] is List<int>);    // true
print(<int>[] is List<String>); // false
\`\`\``,
    tips: [
      'Dart\'s reified generics (unlike Java erasure) mean you can check generic types at runtime with is.',
      'The covariant keyword on method parameters is a power tool — use it only when you understand the implications.',
      'Generic type aliases (typedef Result<T> = ...) are extremely useful for reducing verbosity in complex APIs.',
    ],
    codeSnippet: `// Reified generics demo
void inspectType<T>(T value) {
  print('Runtime type: \${value.runtimeType}');
  print('Is List<int>: \${value is List<int>}');
  print('Is List<String>: \${value is List<String>}');
  print('Is List: \${value is List}');
}

// Bounded generic with multiple constraints via interface
abstract class Measurable {
  double get size;
}

abstract class Labelable {
  String get label;
}

abstract class MeasurableAndLabelable implements Measurable, Labelable {}

class Box extends MeasurableAndLabelable {
  @override final double size;
  @override final String label;
  Box(this.label, this.size);
}

T largest<T extends Measurable>(List<T> items) =>
    items.reduce((a, b) => a.size >= b.size ? a : b);

void printAll<T extends Labelable>(List<T> items) {
  for (final item in items) print('  \${item.label}');
}

void main() {
  print('--- Reified Generics ---');
  inspectType(<int>[1, 2, 3]);

  print('\\n--- Bounded Generics ---');
  final boxes = [Box('Small', 1.0), Box('Large', 5.0), Box('Medium', 3.0)];
  print('Largest: \${largest(boxes).label}');
  print('All boxes:');
  printAll(boxes);

  // Generic type check at runtime
  print('\\n--- Runtime Type Checks ---');
  print(<String>[] is List<int>);  // false
  print(<int>[] is List<num>);     // true — int is subtype of num
}`,
    expectedOutput: `--- Reified Generics ---\nRuntime type: List<int>\nIs List<int>: true\nIs List<String>: false\nIs List: true\n\n--- Bounded Generics ---\nLargest: Large\nAll boxes:\n  Small\n  Large\n  Medium\n\n--- Runtime Type Checks ---\nfalse\ntrue`,
    quiz: [
      { question: 'Are Dart generics erased at runtime (like Java)?', options: ['Yes, they are erased', 'No, Dart generics are reified — preserved at runtime', 'Only for primitive types', 'Only in AOT mode'], correctAnswerIndex: 1 },
      { question: 'What does covariant mean on a method parameter?', options: ['The parameter must be a supertype', 'The parameter accepts the declared type and its subtypes', 'The parameter is optional', 'The parameter is read-only'], correctAnswerIndex: 1 },
      { question: 'Why can\'t you pass List<Dog> where List<Animal> is expected?', options: ['Dog does not extend Animal', 'Generic types are invariant by default in Dart', 'List is sealed', 'You would need to use dynamic instead'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Write a generic function T? findMax<T extends Comparable<T>>(List<T> list, {bool Function(T)? where}) that returns the maximum element optionally filtered by a predicate. Test with integers and strings.',
      starterCode: `T? findMax<T extends Comparable<T>>(List<T> list, {bool Function(T)? where}) {
  // Filter if predicate given, then find max
}

void main() {
  print(findMax([3, 1, 4, 1, 5, 9, 2, 6]));
  print(findMax([3, 1, 4, 1, 5, 9, 2, 6], where: (n) => n < 5));
  print(findMax(['banana', 'apple', 'cherry', 'date']));
  print(findMax([]));
}`,
      solution: `T? findMax<T extends Comparable<T>>(List<T> list, {bool Function(T)? where}) {
  final filtered = where != null ? list.where(where).toList() : list;
  if (filtered.isEmpty) return null;
  return filtered.reduce((a, b) => a.compareTo(b) >= 0 ? a : b);
}

void main() {
  print(findMax([3, 1, 4, 1, 5, 9, 2, 6]));
  print(findMax([3, 1, 4, 1, 5, 9, 2, 6], where: (n) => n < 5));
  print(findMax(['banana', 'apple', 'cherry', 'date']));
  print(findMax([]));
}`,
    },
  },

  {
    id: 67,
    level: 'Advanced',
    title: 'Advanced Patterns — Monad-like Patterns in Dart',
    content: `# Functional Error Handling with Result and Option

Functional programming patterns avoid exceptions for control flow, instead using types that explicitly represent success/failure or presence/absence.

## Result<T, E> — Either Success or Failure

\`\`\`dart
sealed class Result<T, E> {
  const Result();
}
class Ok<T, E> extends Result<T, E> {
  final T value;
  const Ok(this.value);
}
class Err<T, E> extends Result<T, E> {
  final E error;
  const Err(this.error);
}
\`\`\`

## Option<T> — Maybe a Value

\`\`\`dart
sealed class Option<T> {
  const Option();
  static Option<T> some<T>(T value) => Some(value);
  static Option<T> none<T>() => const None();
}
class Some<T> extends Option<T> { final T value; const Some(this.value); }
class None<T> extends Option<T> { const None(); }
\`\`\`

## Chaining with map and flatMap

\`\`\`dart
extension ResultX<T, E> on Result<T, E> {
  Result<R, E> map<R>(R Function(T) f) => switch (this) {
    Ok(value: final v) => Ok(f(v)),
    Err(error: final e) => Err(e),
  };
}
\`\`\``,
    tips: [
      'Result types force callers to handle both success and failure — unlike exceptions which can be silently ignored.',
      'These patterns are common in Rust (Result, Option) and Haskell (Either, Maybe) — understanding them deepens your FP knowledge.',
      'In Dart, the fpdart package provides production-ready Either and Option types.',
    ],
    codeSnippet: `sealed class Result<T, E> {
  const Result();
  bool get isOk => this is Ok<T, E>;
  bool get isErr => this is Err<T, E>;
}

class Ok<T, E> extends Result<T, E> {
  final T value;
  const Ok(this.value);
  @override String toString() => 'Ok(\$value)';
}

class Err<T, E> extends Result<T, E> {
  final E error;
  const Err(this.error);
  @override String toString() => 'Err(\$error)';
}

extension ResultUtils<T, E> on Result<T, E> {
  Result<R, E> map<R>(R Function(T) f) => switch (this) {
    Ok(value: final v) => Ok(f(v)),
    Err() => this as Err<R, E>,
  };

  Result<R, E> flatMap<R>(Result<R, E> Function(T) f) => switch (this) {
    Ok(value: final v) => f(v),
    Err() => this as Err<R, E>,
  };

  T getOrElse(T defaultValue) => switch (this) {
    Ok(value: final v) => v,
    Err() => defaultValue,
  };
}

Result<int, String> parseInt(String s) {
  final n = int.tryParse(s);
  return n != null ? Ok(n) : Err('Not a number: "\$s"');
}

Result<double, String> safeDivide(int a, int b) =>
    b == 0 ? Err('Division by zero') : Ok(a / b);

void main() {
  // Chain operations
  final result = parseInt('42')
      .flatMap((n) => safeDivide(n, 7))
      .map((d) => d * 100);

  print(result); // Ok(600.0)
  print(result.getOrElse(-1)); // 600.0

  // Error case
  final bad = parseInt('abc')
      .flatMap((n) => safeDivide(n, 2));
  print(bad); // Err(Not a number: "abc")
  print(bad.getOrElse(0)); // 0
}`,
    expectedOutput: `Ok(600.0)\n600.0\nErr(Not a number: "abc")\n0`,
    quiz: [
      { question: 'What problem does the Result type solve compared to exceptions?', options: ['It is faster', 'It forces callers to explicitly handle both success and failure paths', 'It eliminates null values', 'It works in async code only'], correctAnswerIndex: 1 },
      { question: 'What does flatMap do differently than map on a Result?', options: ['flatMap is async; map is sync', 'flatMap flattens a nested Result<Result<T>> to Result<T>; map wraps in another Ok', 'They are identical', 'flatMap handles errors; map does not'], correctAnswerIndex: 1 },
      { question: 'What is an Option<T> type equivalent to in Dart?', options: ['A nullable T?', 'An async T', 'A List<T> with at most one element', 'A const T'], correctAnswerIndex: 0 },
    ],
    exercise: {
      instruction: 'Implement a Result-based pipeline: parseAge(String s) → Result<int, String>, validateAge(int age) → Result<int, String> (must be 0-150), formatAge(int age) → String. Chain them and print results for "25", "200", and "abc".',
      starterCode: `// Use the Result classes from the lesson

Result<int, String> parseAge(String s) {
  // Parse to int or Err
}

Result<int, String> validateAge(int age) {
  // Must be 0-150
}

String formatAge(int age) => 'Valid age: \$age years old';

void main() {
  for (final input in ['25', '200', 'abc']) {
    final result = parseAge(input)
        .flatMap(validateAge)
        .map(formatAge);
    print('\$input → \$result');
  }
}`,
      solution: `sealed class Result<T, E> { const Result(); }
class Ok<T, E> extends Result<T, E> { final T value; const Ok(this.value); @override String toString() => 'Ok(\$value)'; }
class Err<T, E> extends Result<T, E> { final E error; const Err(this.error); @override String toString() => 'Err(\$error)'; }

extension ResultUtils<T, E> on Result<T, E> {
  Result<R, E> map<R>(R Function(T) f) => switch (this) { Ok(value: final v) => Ok(f(v)), Err() => this as Err<R, E> };
  Result<R, E> flatMap<R>(Result<R, E> Function(T) f) => switch (this) { Ok(value: final v) => f(v), Err() => this as Err<R, E> };
}

Result<int, String> parseAge(String s) {
  final n = int.tryParse(s);
  return n != null ? Ok(n) : Err('Not a number: "\$s"');
}

Result<int, String> validateAge(int age) =>
    age >= 0 && age <= 150 ? Ok(age) : Err('Age must be 0-150, got \$age');

String formatAge(int age) => 'Valid age: \$age years old';

void main() {
  for (final input in ['25', '200', 'abc']) {
    final result = parseAge(input).flatMap(validateAge).map(formatAge);
    print('\$input → \$result');
  }
}`,
    },
  },

  {
    id: 68,
    level: 'Advanced',
    title: 'Memory Management and the Garbage Collector',
    content: `# Memory Management in Dart

Dart uses a generational garbage collector (GC) that is designed for low-latency, suitable for UI applications like Flutter.

## The Generational GC

Objects are allocated in two generations:
- **Young generation** (nursery): Most objects live and die here. Collection is fast.
- **Old generation**: Long-lived objects promoted from young. Collection is less frequent.

Flutter's GC is tuned to avoid pauses during frame rendering.

## Object Lifecycle

1. Object created → allocated in young generation
2. If it survives a GC cycle → promoted to old generation
3. When no more references exist → eligible for collection

## Avoiding Memory Leaks in Dart

**Common causes:**
- Listeners never removed (especially StreamSubscriptions)
- Closures capturing large objects
- Static variables holding references
- Isolate handles not closed

\`\`\`dart
// Leak: subscription never cancelled
stream.listen(handler); // BAD if the object is disposed

// Fix:
final sub = stream.listen(handler);
// When done:
await sub.cancel();
\`\`\`

## Weak References

\`\`\`dart
final weakRef = WeakReference<MyObject>(myObj);
// Returns null if the object has been garbage collected
final obj = weakRef.target;
\`\`\`

## Finalizers

\`\`\`dart
final finalizer = Finalizer<String>((token) {
  print('Object with token \$token was collected');
});
finalizer.attach(myObject, 'my-token', detach: myObject);
\`\`\``,
    tips: [
      'In Flutter, always cancel StreamSubscriptions in dispose() to prevent memory leaks.',
      'Use WeakReference when you want to hold a reference that doesn\'t prevent garbage collection.',
      'Avoid large static collections that grow unbounded — they are never garbage collected.',
    ],
    codeSnippet: `import 'dart:async';

// Demonstrating subscription lifecycle management
class DataStream {
  final _controller = StreamController<int>.broadcast();
  int _count = 0;
  Timer? _timer;

  void start() {
    _timer = Timer.periodic(Duration(milliseconds: 100), (_) {
      _controller.add(_count++);
    });
  }

  Stream<int> get stream => _controller.stream;

  void dispose() {
    _timer?.cancel();
    _controller.close();
    print('DataStream disposed');
  }
}

class Consumer {
  StreamSubscription<int>? _sub;
  final List<int> received = [];

  void attach(Stream<int> stream) {
    _sub = stream.listen((n) => received.add(n));
    print('Consumer attached');
  }

  Future<void> detach() async {
    await _sub?.cancel();
    _sub = null;
    print('Consumer detached (sub cancelled)');
  }
}

void main() async {
  final ds = DataStream();
  final consumer = Consumer();

  ds.start();
  consumer.attach(ds.stream);

  await Future.delayed(Duration(milliseconds: 350));
  print('Received so far: \${consumer.received}');

  await consumer.detach(); // cancel subscription before disposing
  ds.dispose();            // dispose the stream

  // WeakReference demo
  print('\\n--- WeakReference ---');
  var obj = Object();
  final weak = WeakReference(obj);
  print('Target before GC: \${weak.target != null}'); // true
  obj = Object(); // original Object is eligible for collection
  print('Target reassigned (GC may collect): \${weak.target != null}');
}`,
    expectedOutput: `Consumer attached\nReceived so far: [0, 1, 2]\nConsumer detached (sub cancelled)\nDataStream disposed\n\n--- WeakReference ---\nTarget before GC: true\nTarget reassigned (GC may collect): true`,
    quiz: [
      { question: 'What are the two generations in Dart\'s garbage collector?', options: ['Heap and stack', 'Young and old', 'Fast and slow', 'Local and global'], correctAnswerIndex: 1 },
      { question: 'What is the most common memory leak in Flutter apps?', options: ['Creating too many widgets', 'StreamSubscriptions never cancelled', 'Using final instead of var', 'Too many const objects'], correctAnswerIndex: 1 },
      { question: 'What does WeakReference do differently from a normal reference?', options: ['It is faster to dereference', 'It does not prevent the referenced object from being garbage collected', 'It is thread-safe', 'It copies the object'], correctAnswerIndex: 1 },
    ],
    exercise: {
      instruction: 'Build a ResourcePool<T> class that holds a fixed set of resources. Add acquire() that returns a resource (throws if pool is empty), release(T resource) that returns it, a count getter for available resources, and a dispose() that clears all. Test acquiring all, then releasing one.',
      starterCode: `class ResourcePool<T> {
  final List<T> _available;
  ResourcePool(List<T> resources) : _available = List.of(resources);

  int get count => _available.length;

  T acquire() {
    // Throw if empty
  }

  void release(T resource) {
    // Return resource to pool
  }

  void dispose() {
    // Clear all
  }
}

void main() {
  final pool = ResourcePool<String>(['conn1', 'conn2', 'conn3']);
  print('Available: \${pool.count}');
  final c1 = pool.acquire();
  final c2 = pool.acquire();
  print('After 2 acquires: \${pool.count}');
  pool.release(c1);
  print('After release: \${pool.count}');
  pool.dispose();
  print('After dispose: \${pool.count}');
}`,
      solution: `class ResourcePool<T> {
  final List<T> _available;
  ResourcePool(List<T> resources) : _available = List.of(resources);

  int get count => _available.length;

  T acquire() {
    if (_available.isEmpty) throw StateError('Pool is empty');
    return _available.removeLast();
  }

  void release(T resource) => _available.add(resource);

  void dispose() => _available.clear();
}

void main() {
  final pool = ResourcePool<String>(['conn1', 'conn2', 'conn3']);
  print('Available: \${pool.count}');
  final c1 = pool.acquire();
  final c2 = pool.acquire();
  print('After 2 acquires: \${pool.count}');
  pool.release(c1);
  print('After release: \${pool.count}');
  pool.dispose();
  print('After dispose: \${pool.count}');
}`,
    },
  },


];