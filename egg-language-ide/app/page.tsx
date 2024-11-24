import { EggIDE } from '../components/egg-ide'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Egg Language IDE</h1>
      <EggIDE />
    </main>
  )
}

