import React from 'react'

export interface ContainerQueryCardProps {
  title: string
  description: string
  imageUrl?: string
  actions?: React.ReactNode
  containerName?: string
}

// TODO 1: Implement getContainerCSS.
//         Return the full CSS string including:
//           .cq-wrapper { container-type: inline-size; container-name: [name]; }
//           .cq-card { display: flex; flex-direction: column; gap: 12px; }
//           @container [name] (min-width: 400px) {
//             .cq-card { flex-direction: row; align-items: flex-start; }
//             .cq-card-image { width: 200px; flex-shrink: 0; }
//           }
//         Use the provided containerName (default 'card') in the @container rule.
export function getContainerCSS(containerName?: string): string {
  throw new Error('Not implemented')
}

// TODO 2: Implement ContainerQueryCard.
//         Wrap the card in a container element with container-type: inline-size.
//         Inject the CSS from getContainerCSS() via a <style> tag.
//         The outer wrapper gets the container CSS; the inner div gets the card layout CSS.
// TODO 3: Render title as an <h3>, description as a <p>.
//         If imageUrl is provided, render an <img> that hides in the narrow layout
//         and shows at width:200px in the wide layout.
// TODO 4: If actions prop is provided, render it in a footer area of the card.
// TODO 5: Note: @container queries are not testable without a real browser — this component
//         demonstrates the pattern. The test will verify the CSS string structure.
export function ContainerQueryCard(props: ContainerQueryCardProps): React.ReactElement {
  throw new Error('Not implemented')
}
