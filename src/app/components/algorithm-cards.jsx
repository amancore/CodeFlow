import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

const algorithms = [
	{
	    id: 'binary-search',
	    title: 'Binary Search',
		description: "Visualize binary search with a sorted array, highlighting the middle element and narrowing the search range. Each step halves the array, showing efficient target value finding.",
	    image: '/CodeFlow/images/node.png?height=200&width=300'
	},
	{
	    id: 'n-queen',
	    title: 'N Queen',
	    description: "The N queens puzzle is the problem of placing N chess queens on an N*N chessboard so that no two queens threaten each other",
	    image: '/CodeFlow/images/matrix.PNG?height=200&width=300'
	},
	{
		id: 'prime-numbers',
		title: 'Prime Numbers',
		description: "Depict prime numbers on a grid, spotlighting numbers divisible only by 1 and themselves. This graphical layout assists in grasping their distribution pattern.",
		image: '/CodeFlow/images/number-1.png?height=200&width=300'
	},
	{
		id: 'recursive-sorting',
		title: 'Divide & Conquer Sorting',
		description: "Present recursive sorting via a tree diagram, breaking down data into manageable segments. Each branch symbolizes a recursive call, sequentially revealing the sorting mechanism.",
		image: '/CodeFlow/images/consolidate.png?height=200&width=300'
	},
	  
  {
    id: 'pathfinder',
	  title: "Dijkstra Algorithm",
	  description: "Visualise Dijkstra's algorithm on a graph, tracing shortest paths from a source node. Nodes are sequentially explored, with distances dynamically updated, showcasing efficient route determination.",
	  image: '/CodeFlow/images/knowledge-graph.png?height=200&width=300'
	},
	{
	    id: 'sorting',
	    title: 'Sorting Algorithm',
		description: "Animate sorting algorithms using bar charts, dynamically reordering elements in real-time. Distinct colors delineate sorted and unsorted segments, vividly depicting the sorting progression.",
	    image: '/CodeFlow/images/order.png?height=200&width=300'
	  },
  	{
  	  id: 'recursion-tree',
  	  title: 'Recursive Tree',
			description: "Map recursive trees using nodes and branches, tracing function calls and recursive steps. This diagrammatic approach clarifies the algorithm's sequence and structural intricacies.",
  	  image: '/CodeFlow/images/network.png?height=200&width=300'
  	}
]
export function AlgorithmCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {algorithms.map((algorithm) => (
        <Link key={algorithm.id} href={`/${algorithm.id}`} className="block group">
          <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
            <div className="relative h-48">
              <Image
                src={algorithm.image}
                alt={algorithm.title}
                layout="fill"
				objectFit="contain" 
				className="transition-transform duration-300 group-hover:scale-90 scale-75"
              />
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                {algorithm.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-lg text-muted-foreground">{algorithm.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

