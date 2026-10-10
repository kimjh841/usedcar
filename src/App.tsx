import { useState } from "react"

type IconName = "search" | "heart" | "user" | "car" | "sell" | "shield" | "chevron" | "arrow" | "clock" | "check" | "home" | "chart" | "menu"

function Icon({
  name,
  size = 20,
  filled = false,
}: {
  name: IconName
  size?: number
  filled?: boolean
}) {
  const paths: Record<IconName, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z" />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    car: (
      <>
        <path d="m5 17-1 2v1h2l1-2h10l1 2h2v-1l-1-2" />
        <path d="M3 13h18l-2-6a2 2 0 0 0-2-1H7a2 2 0 0 0-2 1Z" />
        <circle cx="7" cy="14" r="1" />
        <circle cx="17" cy="14" r="1" />
      </>
    ),
    sell: (
      <>
        <path d="M3 12h18" />
        <path d="M7 8h10l2 4v7H5v-7Z" />
        <path d="m15 3 3 3 3-3" />
        <path d="M18 6V1" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19V2" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

const cars = [
  {
    id: 1,
    brand: "현대",
    name: "디 올 뉴 그랜저 하이브리드",
    year: "24/02식",
    distance: "12,340km",
    price: "4,290만원",
    monthly: "월 62만원",
    image:
      "https://images.unsplash.com/photo-1574023240744-64c47c8c0676?auto=format&fit=crop&w=900&q=85",
    tag: "진단 완료",
  },
  {
    id: 2,
    brand: "제네시스",
    name: "GV70 2.5T AWD",
    year: "23/08식",
    distance: "21,550km",
    price: "5,180만원",
    monthly: "월 75만원",
    image:
      "https://images.unsplash.com/photo-1616591938133-8d6fac01df84?auto=format&fit=crop&w=900&q=85",
    tag: "엔카보증",
  },
  {
    id: 3,
    brand: "BMW",
    name: "5시리즈 520i M Sport",
    year: "22/11식",
    distance: "32,810km",
    price: "4,650만원",
    monthly: "월 68만원",
    image:
      "https://images.unsplash.com/photo-1619795080853-88b800fc4339?auto=format&fit=crop&w=900&q=85",
    tag: "홈서비스",
  },
]

const filters = ["제조사", "모델", "연식", "가격"]
const categories = [
  { label: "국산차", sub: "112,843대", icon: "car" as IconName },
  { label: "수입차", sub: "48,210대", icon: "chart" as IconName },
  { label: "전기차", sub: "친환경 모빌리티", icon: "check" as IconName },
  { label: "내 차 팔기", sub: "비교견적 받기", icon: "sell" as IconName },
]

function App() {
  const [activeNav, setActiveNav] = useState("차량 검색")
  const [activeTab, setActiveTab] = useState("추천")
  const [selectedFilter, setSelectedFilter] = useState("차종")
  const [liked, setLiked] = useState<number[]>([])
  const [query, setQuery] = useState("")
  const [searchMessage, setSearchMessage] = useState("")

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const handleSearch = () => {
    setSearchMessage(
      query.trim()
        ? `'${query}' 조건의 매물을 찾고 있어요`
        : "원하는 조건을 선택하면 딱 맞는 차량을 찾아드려요",
    )
  }

  return (
    <div className="min-h-screen bg-canvas pb-24 text-ink lg:pb-0">
      <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button
            aria-label="엔카랩 홈"
            className="flex items-center gap-2.5"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-white shadow-brand">
              <Icon name="car" size={21} />
            </span>
            <span className="text-xl font-black tracking-tight">
              Encar<span className="text-brand">Lab</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {["차량 검색", "내 차 팔기", "엔카진단", "구매 가이드"].map(
              (item) => (
                <button
                  className={`relative py-6 text-sm font-bold transition-colors ${
                    activeNav === item
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                  key={item}
                  onClick={() => setActiveNav(item)}
                >
                  {item}
                  {activeNav === item && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand" />
                  )}
                </button>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="찜한 차량"
              className="grid size-10 place-items-center rounded-full text-muted transition hover:bg-soft hover:text-ink"
            >
              <Icon name="heart" />
            </button>
            <button
              aria-label="마이페이지"
              className="hidden size-10 place-items-center rounded-full text-muted transition hover:bg-soft hover:text-ink sm:grid"
            >
              <Icon name="user" />
            </button>
            <button
              aria-label="전체 메뉴"
              className="grid size-10 place-items-center rounded-full text-muted transition hover:bg-soft hover:text-ink lg:hidden"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4/5 bg-hero" />
          <div className="relative mx-auto grid max-w-7xl gap-7 px-5 pb-14 pt-10 lg:grid-cols-2 lg:items-center lg:px-8 lg:pb-20 lg:pt-16">
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-muted ring-1 ring-white backdrop-blur">
                <span className="size-2 rounded-full bg-brand" />
                오늘 새로 등록된 차량 1,284대
              </div>
              <p className="max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                좋은 차를 만나는
                <br />
                <span className="text-brand">가장 확실한 방법.</span>
              </p>
              <p className="mt-5 max-w-md text-base leading-7 text-muted">
                복잡한 중고차 정보를 한눈에. 진단부터 가격 비교, 배송까지 더
                투명하고 편리하게 만나보세요.
              </p>

              <div className="mt-8 rounded-3xl bg-white p-2 shadow-search ring-1 ring-line/60 sm:p-3">
                <div className="flex items-center px-3">
                  <span className="text-muted">
                    <Icon name="search" size={22} />
                  </span>
                  <input
                    aria-label="차량 검색"
                    className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm font-medium outline-none placeholder:text-faint"
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" && handleSearch()
                    }
                    placeholder="어떤 차를 찾고 계세요? 예: 그랜저 하이브리드"
                    value={query}
                  />
                  <button
                    className="rounded-2xl bg-ink px-5 py-3.5 text-sm font-bold text-white transition hover:bg-brand"
                    onClick={handleSearch}
                  >
                    검색
                  </button>
                </div>
                <div className="grid grid-cols-4 border-t border-line sm:flex sm:gap-1 sm:px-2 sm:pt-2">
                  {filters.map((filter) => (
                    <button
                      className="flex items-center justify-center gap-1 border-r border-line px-2 py-3 text-xs font-semibold text-muted last:border-r-0 hover:text-ink sm:border-0 sm:rounded-xl sm:px-4"
                      key={filter}
                      onClick={() =>
                        setSearchMessage(`${filter} 조건을 선택해 주세요`)
                      }
                    >
                      {filter}
                      <Icon name="chevron" size={14} />
                    </button>
                  ))}
                </div>
              </div>
              {searchMessage && (
                <p className="mt-3 pl-2 text-sm font-semibold text-brand">
                  {searchMessage}
                </p>
              )}
            </div>

            <div className="relative hidden min-h-116 lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] bg-ink">
                <img
                  alt="도심 속 프리미엄 차량"
                  className="h-full w-full object-cover opacity-90"
                  src="https://images.unsplash.com/photo-1615563868638-98253a7dc33b?auto=format&fit=crop&w=1400&q=90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <p className="text-xs font-bold text-white/70">
                    EDITOR'S PICK
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    취향까지 맞춘 오늘의 차
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    내가 본 차량을 바탕으로 새롭게 골랐어요
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-8 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card">
                <span className="grid size-11 place-items-center rounded-xl bg-mint text-forest">
                  <Icon name="shield" />
                </span>
                <div>
                  <p className="text-xs text-muted">믿을 수 있는 진단</p>
                  <p className="mt-0.5 text-sm font-extrabold">
                    사고·교환 205개 항목 확인
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
          <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white p-3 shadow-subtle ring-1 ring-line/60 md:grid-cols-4 md:p-4">
            {categories.map((category) => (
              <button
                className="group flex items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-soft md:p-4"
                key={category.label}
                onClick={() =>
                  setSearchMessage(`${category.label} 메뉴를 선택했어요`)
                }
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-soft text-ink transition group-hover:bg-ink group-hover:text-white">
                  <Icon name={category.icon} />
                </span>
                <span>
                  <span className="block text-sm font-extrabold">
                    {category.label}
                  </span>
                  <span className="mt-1 block text-xs text-faint">
                    {category.sub}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest text-brand">
                FOR YOU
              </p>
              <p className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                지금 눈여겨볼 만한 차
              </p>
              <p className="mt-2 text-sm text-muted">
                최근 조회와 인기 조건을 바탕으로 골랐어요.
              </p>
            </div>
            <button className="hidden items-center gap-2 text-sm font-bold text-muted transition hover:text-ink sm:flex">
              전체 보기 <Icon name="arrow" size={17} />
            </button>
          </div>

          <div className="mt-7 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {["추천", "가격 좋은 차", "신차급", "출퇴근용", "패밀리 SUV"].map(
              (tab) => (
                <button
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                    activeTab === tab
                      ? "bg-ink text-white"
                      : "bg-white text-muted ring-1 ring-line hover:text-ink"
                  }`}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {cars.map((car) => (
              <article
                className="group overflow-hidden rounded-3xl bg-white shadow-subtle ring-1 ring-line/70 transition duration-300 hover:-translate-y-1 hover:shadow-card"
                key={car.id}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-soft">
                  <img
                    alt={car.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={car.image}
                  />
                  <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-extrabold text-ink backdrop-blur">
                    {car.tag}
                  </span>
                  <button
                    aria-label={`${car.name} 찜하기`}
                    className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full backdrop-blur transition ${
                      liked.includes(car.id)
                        ? "bg-brand text-white"
                        : "bg-white/90 text-ink hover:text-brand"
                    }`}
                    onClick={() => toggleLike(car.id)}
                  >
                    <Icon
                      name="heart"
                      filled={liked.includes(car.id)}
                      size={19}
                    />
                  </button>
                  <span className="absolute bottom-4 right-4 rounded-full bg-ink/65 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                    1 / 12
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-muted">{car.brand}</p>
                  <p className="mt-1.5 text-lg font-extrabold tracking-tight">
                    {car.name}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {car.year} · {car.distance}
                  </p>
                  <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
                    <p className="text-xl font-black">{car.price}</p>
                    <p className="text-xs font-semibold text-muted">
                      {car.monthly}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <p className="text-xs font-bold tracking-widest text-brand-light">
                  ENCAR LAB STANDARD
                </p>
                <p className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                  우리가 차를 확인하는
                  <br />더 꼼꼼한 기준
                </p>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
                  성능점검 기록만 보여주지 않습니다. 전문 진단사가 직접 확인한
                  핵심 정보를 이해하기 쉽게 제공합니다.
                </p>
                <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-brand hover:text-white">
                  진단 기준 알아보기 <Icon name="arrow" size={17} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    number: "205",
                    label: "진단 항목",
                    copy: "외관부터 주행 상태까지",
                  },
                  {
                    number: "7일",
                    label: "책임 환불",
                    copy: "직접 타보고 결정하세요",
                  },
                  {
                    number: "24h",
                    label: "비대면 상담",
                    copy: "원할 때 편하게 문의하세요",
                  },
                ].map((feature) => (
                  <div
                    className="rounded-3xl border border-white/10 bg-white/5 p-5"
                    key={feature.label}
                  >
                    <span className="grid size-9 place-items-center rounded-xl bg-brand/15 text-brand-light">
                      <Icon name="check" size={18} />
                    </span>
                    <p className="mt-8 text-3xl font-black">{feature.number}</p>
                    <p className="mt-1 text-sm font-extrabold">
                      {feature.label}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-white/50">
                      {feature.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="overflow-hidden rounded-[2rem] bg-peach">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 lg:p-12">
                <span className="inline-flex rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-brand">
                  AI 시세 리포트
                </span>
                <p className="mt-5 text-3xl font-black tracking-tight">
                  내 차, 얼마에 팔 수 있을까?
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                  차량번호만 입력하면 실시간 거래 데이터로 예상 시세와 판매
                  타이밍을 알려드려요.
                </p>
                <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-extrabold text-white shadow-brand transition hover:bg-ink">
                  내 차 시세 확인하기 <Icon name="arrow" size={17} />
                </button>
              </div>
              <div className="relative min-h-64 overflow-hidden">
                <img
                  alt="차량 시세 확인 서비스"
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1626002595481-688505bc19ba?auto=format&fit=crop&w=1000&q=85"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-peach via-peach/30 to-transparent lg:block" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="text-base font-black text-ink">
              Encar<span className="text-brand">Lab</span>
            </p>
            <p className="mt-2">더 나은 중고차 거래를 위한 새로운 기준</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
            <button>서비스 안내</button>
            <button>이용약관</button>
            <button className="text-ink">개인정보처리방침</button>
            <button>고객센터</button>
          </div>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-line bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-mobile backdrop-blur-xl lg:hidden">
        {[
          { label: "홈", icon: "home" as IconName },
          { label: "차량검색", icon: "search" as IconName },
          { label: "찜", icon: "heart" as IconName },
          { label: "MY", icon: "user" as IconName },
        ].map((item, index) => (
          <button
            className={`flex flex-col items-center gap-1 py-3 text-xs font-bold ${
              index === 0 ? "text-brand" : "text-faint"
            }`}
            key={item.label}
          >
            <Icon name={item.icon} filled={index === 0} size={21} />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
