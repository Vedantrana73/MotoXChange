import { Card, CardContent } from "../components/ui/card.tsx";

export default function ServiceCard({ title, description, image }) {
  return (
    <Card className={`rounded-xl shadow-lg overflow-hidden w-80 min-h-70 md:min-h-90 border border-gray-400`}>
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-b-4xl" />
      </div>
      <CardContent className="p-5 text-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
