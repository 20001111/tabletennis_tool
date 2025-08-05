import { PrismaClient, EquipmentType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete existing data
  await prisma.review.deleteMany({})
  await prisma.equipment.deleteMany({})
  await prisma.category.deleteMany({})

  // Create categories
  const rubberCategory = await prisma.category.create({
    data: { name: 'ラバー' }
  })

  const bladeCategory = await prisma.category.create({
    data: { name: 'ラケット' }
  })

  const ballCategory = await prisma.category.create({
    data: { name: 'ボール' }
  })

  // Create sample equipment with images
  const equipment1 = await prisma.equipment.create({
    data: {
      id: 'sample-rubber-1',
      name: 'テナジー05',
      manufacturer: 'バタフライ',
      type: EquipmentType.RUBBER,
      description: '高弾性・高摩擦のハイエンドラバー。スピードとスピンの両立を実現。世界のトッププレーヤーに愛用されている最高峰のラバーです。弾みとスピンのバランスが絶妙で、攻撃的なプレーを可能にします。',
      price: 7000,
      imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center',
      specs: {
        thickness: ['厚', '特厚', '最大厚'],
        speed: 13,
        spin: 11.5,
        control: 8.5,
        spongeHardness: 36,
        surface: '高摩擦トップシート',
        weight: '約60g (特厚)'
      },
      categories: {
        connect: [{ id: rubberCategory.id }]
      }
    }
  })

  const equipment2 = await prisma.equipment.create({
    data: {
      id: 'sample-rubber-2',
      name: 'ファスタークG-1',
      manufacturer: 'ニッタク',
      type: EquipmentType.RUBBER,
      description: '回転重視のハイテンションラバー。安定したプレーが可能。中級者から上級者まで幅広く使用できる汎用性の高いラバーです。特に回転をかけやすく、安定性に優れています。',
      price: 5500,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      specs: {
        thickness: ['中', '厚', '特厚'],
        speed: 12,
        spin: 12.5,
        control: 10,
        spongeHardness: 47.5,
        surface: 'テンションラバー',
        weight: '約55g (厚)'
      },
      categories: {
        connect: [{ id: rubberCategory.id }]
      }
    }
  })

  const equipment3 = await prisma.equipment.create({
    data: {
      id: 'sample-blade-1',
      name: 'インナーフォース レイヤー ZLC',
      manufacturer: 'バタフライ',
      type: EquipmentType.BLADE,
      description: '特殊素材ZLカーボンを搭載したオールラウンドラケット。攻守のバランスが取れた万能型のラケットで、あらゆるプレースタイルに対応できます。打球感が良く、コントロール性能も優秀です。',
      price: 18000,
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=center',
      specs: {
        plies: 5,
        weight: 90,
        thickness: 5.8,
        speed: 'OFF-',
        control: 'HIGH',
        blade_size: '157×150mm',
        grip: 'FL/ST'
      },
      categories: {
        connect: [{ id: bladeCategory.id }]
      }
    }
  })

  const equipment4 = await prisma.equipment.create({
    data: {
      id: 'sample-rubber-3',
      name: 'ロゼナ',
      manufacturer: 'バタフライ',
      type: EquipmentType.RUBBER,
      description: '初中級者向けの扱いやすいテンションラバー。適度なスピードと回転を兼ね備え、コントロール性能に優れています。価格も手頃で入門用としても最適です。',
      price: 3500,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      specs: {
        thickness: ['薄', '中', '厚', '特厚'],
        speed: 9.5,
        spin: 9.5,
        control: 10.5,
        spongeHardness: 35,
        surface: 'ハイテンションラバー',
        weight: '約50g (厚)'
      },
      categories: {
        connect: [{ id: rubberCategory.id }]
      }
    }
  })

  const equipment5 = await prisma.equipment.create({
    data: {
      id: 'sample-blade-2',
      name: 'コルベル',
      manufacturer: 'バタフライ',
      type: EquipmentType.BLADE,
      description: 'オールラウンド系の定番ラケット。5枚合板で扱いやすく、多くのプレーヤーに愛用されています。初心者から中級者まで幅広く対応できる優秀なラケットです。',
      price: 8500,
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=center',
      specs: {
        plies: 5,
        weight: 85,
        thickness: 5.5,
        speed: 'OFF',
        control: 'HIGH',
        blade_size: '157×150mm',
        grip: 'FL/ST/AN'
      },
      categories: {
        connect: [{ id: bladeCategory.id }]
      }
    }
  })

  const equipment6 = await prisma.equipment.create({
    data: {
      id: 'sample-ball-1',
      name: '3スターボール',
      manufacturer: 'バタフライ',
      type: EquipmentType.BALL,
      description: '公式大会で使用される最高品質のプラスチックボール。ITTF公認で、均一な弾みと回転性能を実現しています。練習から試合まで幅広く使用できます。',
      price: 400,
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=center',
      specs: {
        material: 'プラスチック',
        diameter: '40mm',
        weight: '2.7g',
        color: 'オレンジ/ホワイト',
        certification: 'ITTF公認'
      },
      categories: {
        connect: [{ id: ballCategory.id }]
      }
    }
  })

  // Create sample reviews with more variety
  await prisma.review.createMany({
    data: [
      // テナジー05のレビュー
      {
        rating: 5,
        comment: '非常に高性能なラバーです。スピードとスピンのバランスが素晴らしく、上級者におすすめです。慣れるまで時間がかかりますが、使いこなせれば最強のラバーだと思います。',
        equipmentId: equipment1.id,
        isVerified: true
      },
      {
        rating: 4,
        comment: '回転がかけやすく、コントロールも良好です。中級者から上級者まで幅広く使えると思います。ただし、価格が高いのが難点ですね。',
        equipmentId: equipment1.id,
        isVerified: false
      },
      {
        rating: 5,
        comment: 'プロも使用している信頼性の高いラバー。スピードドライブが打ちやすく、相手のボールに負けない強いボールが打てます。',
        equipmentId: equipment1.id,
        isVerified: true
      },
      {
        rating: 3,
        comment: '確かに性能は良いのですが、初心者には扱いが難しすぎます。ある程度技術が身についてから使うことをおすすめします。',
        equipmentId: equipment1.id,
        isVerified: false
      },
      
      // ファスタークG-1のレビュー
      {
        rating: 4,
        comment: '安定性抜群のラバーです。練習用としても試合用としても使いやすいです。コスパも良く、長く使えそうです。',
        equipmentId: equipment2.id,
        isVerified: true
      },
      {
        rating: 5,
        comment: '回転系ラバーの中では扱いやすく、安定したプレーができます。特にループドライブが打ちやすいです。',
        equipmentId: equipment2.id,
        isVerified: true
      },
      {
        rating: 4,
        comment: 'テナジーは高すぎるので、こちらを購入。性能的には十分満足しています。耐久性も良好です。',
        equipmentId: equipment2.id,
        isVerified: false
      },

      // インナーフォース レイヤー ZLCのレビュー
      {
        rating: 5,
        comment: '素晴らしいラケットです。打球感が良く、どんなプレースタイルにも対応できます。値段は高いですが価値はあります。',
        equipmentId: equipment3.id,
        isVerified: true
      },
      {
        rating: 4,
        comment: '攻守のバランスが良く、使いやすいラケットです。重量も適度で長時間の練習でも疲れにくいです。',
        equipmentId: equipment3.id,
        isVerified: true
      },

      // ロゼナのレビュー
      {
        rating: 4,
        comment: '初心者にも扱いやすく、価格も手頃で良いラバーです。基礎技術の習得には最適だと思います。',
        equipmentId: equipment4.id,
        isVerified: true
      },
      {
        rating: 5,
        comment: 'コントロール重視の私には最適なラバーでした。安定してボールが入り、ミスが減りました。',
        equipmentId: equipment4.id,
        isVerified: false
      },
      {
        rating: 3,
        comment: '悪くはないのですが、上達してくると物足りなさを感じます。入門用としては良いと思います。',
        equipmentId: equipment4.id,
        isVerified: false
      },

      // コルベルのレビュー
      {
        rating: 5,
        comment: '定番中の定番ラケット。迷ったらこれを選んでおけば間違いありません。バランスが非常に良いです。',
        equipmentId: equipment5.id,
        isVerified: true
      },
      {
        rating: 4,
        comment: '初心者の時から使っています。上達に合わせて長く使えるラケットだと思います。',
        equipmentId: equipment5.id,
        isVerified: true
      },

      // 3スターボールのレビュー
      {
        rating: 5,
        comment: '公式球だけあって品質が安定しています。練習でも試合と同じ感覚でプレーできます。',
        equipmentId: equipment6.id,
        isVerified: true
      },
      {
        rating: 4,
        comment: '品質は良いのですが、価格がもう少し安ければ嬉しいです。でも練習には必要な投資だと思います。',
        equipmentId: equipment6.id,
        isVerified: false
      }
    ]
  })

  // Update average ratings
  const reviews1 = await prisma.review.findMany({
    where: { equipmentId: equipment1.id }
  })
  const avgRating1 = reviews1.reduce((sum, review) => sum + review.rating, 0) / reviews1.length
  await prisma.equipment.update({
    where: { id: equipment1.id },
    data: { avgRating: avgRating1 }
  })

  const reviews2 = await prisma.review.findMany({
    where: { equipmentId: equipment2.id }
  })
  const avgRating2 = reviews2.reduce((sum, review) => sum + review.rating, 0) / reviews2.length
  await prisma.equipment.update({
    where: { id: equipment2.id },
    data: { avgRating: avgRating2 }
  })

  const reviews3 = await prisma.review.findMany({
    where: { equipmentId: equipment3.id }
  })
  const avgRating3 = reviews3.reduce((sum, review) => sum + review.rating, 0) / reviews3.length
  await prisma.equipment.update({
    where: { id: equipment3.id },
    data: { avgRating: avgRating3 }
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })