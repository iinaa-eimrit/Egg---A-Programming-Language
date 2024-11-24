import { Button } from '@/components/ui/button'

const examples = [
  {
    name: "Hello World",
    code: 'print("Hello, World!")'
  },
  {
    name: "Sum of Array",
    code: `
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3, 4, 5))))
`
  },
  {
    name: "Fibonacci",
    code: `
do(define(fib, fun(n,
     if(<(n, 2),
        1,
        +(fib(-(n, 1)), fib(-(n, 2)))))),
   print(fib(10)))
`
  }
]

export function ExamplePrograms({ onSelectExample }: { onSelectExample: (code: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {examples.map((example, index) => (
        <Button key={index} variant="outline" onClick={() => onSelectExample(example.code)}>
          {example.name}
        </Button>
      ))}
    </div>
  )
}

