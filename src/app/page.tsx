import equipmentData from '@/data/equipment.json'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">卓球用具一覧</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentData.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.manufacturer}</p>
            <p className="text-lg font-bold text-blue-600 mb-2">¥{item.price.toLocaleString()}</p>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < item.avgRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({item.avgRating})</span>
            </div>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
              {item.type === 'RUBBER' ? 'ラバー' : 
               item.type === 'BLADE' ? 'ラケット' : 
               item.type === 'BALL' ? 'ボール' : item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
