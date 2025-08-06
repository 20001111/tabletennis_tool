import equipmentData from '@/data/equipment.json';
import Link from 'next/link';
import Image from 'next/image';
import { StarRating } from '@/components/ui/StarRating';

export default function Home() {
  const topRatedEquipment = [...equipmentData]
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">卓球用具レビューへようこそ</h1>
        <p className="text-gray-600 mb-6">最新の卓球用具をチェックし、評価やレビューを共有しましょう。</p>
        <Link
          href="/equipment"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          用具一覧を見る
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">高評価の用具</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedEquipment.map((item) => (
            <Link
              key={item.id}
              href={`/equipment/${item.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {item.imageUrl && (
                <div className="relative h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px)100vw, (max-width:1200px)50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.manufacturer}</p>
                <StarRating rating={item.avgRating} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
