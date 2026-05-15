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

];