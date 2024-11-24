'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ExamplePrograms } from './example-programs'
import { run } from '../lib/egg'

export function EggIDE() {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const handleRunCode = () => {
    const result = run(code)
    setOutput(result)
  }

  const handleSelectExample = (exampleCode: string) => {
    setCode(exampleCode.trim())
    setOutput('')
  }

  return (
    <div className="space-y-4">
      <ExamplePrograms onSelectExample={handleSelectExample} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Egg Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your Egg code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[300px]"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleRunCode}>Run Code</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap break-words bg-muted p-4 rounded-md min-h-[300px]">
              {output}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

