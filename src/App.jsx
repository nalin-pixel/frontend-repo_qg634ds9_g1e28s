import { useEffect, useMemo, useRef, useState } from 'react'
import { ChefHat, Leaf, Clock } from 'lucide-react'

function App() {
  // Ingredient tags state
  const [inputValue, setInputValue] = useState('')
  const [ingredients, setIngredients] = useState([
    // starter tags to hint usage, can be empty
  ])

  // Dietary filters
  const [filters, setFilters] = useState({
    Vegan: false,
    'Gluten-Free': false,
    'High Protein': false,
  })

  // Modal state
  const [activeRecipe, setActiveRecipe] = useState(null)

  // Shopping list
  const [shoppingList, setShoppingList] = useState([])

  // Simple confetti cue control
  const [showConfetti, setShowConfetti] = useState(false)

  // Focus trap refs
  const modalRef = useRef(null)

  // Mock recipes dataset (15 items)
  const recipes = useMemo(
    () => [
      {
        id: 1,
        title: 'Creamy Tomato Basil Pasta',
        ingredients: ['pasta', 'tomato', 'basil', 'garlic', 'olive oil', 'cream', 'parmesan'],
        dietTags: [],
        time: 25,
        image: 'https://placehold.co/600x400/EDF1E3/2F3E2F?text=Tomato+Basil+Pasta',
        instructions:
          'Boil pasta. Sauté garlic in olive oil, add tomato and cream, simmer. Toss with pasta and basil. Finish with parmesan.',
      },
      {
        id: 2,
        title: 'Lemon Herb Roast Chicken',
        ingredients: ['chicken', 'lemon', 'garlic', 'thyme', 'olive oil', 'salt', 'pepper'],
        dietTags: ['High Protein', 'Gluten-Free'],
        time: 60,
        image: 'https://placehold.co/600x400/E6F0DA/2F3E2F?text=Roast+Chicken',
        instructions:
          'Rub chicken with lemon, garlic, thyme, oil, salt and pepper. Roast until golden and juices run clear.',
      },
      {
        id: 3,
        title: 'Chickpea Buddha Bowl',
        ingredients: ['chickpeas', 'quinoa', 'spinach', 'avocado', 'carrot', 'tahini', 'lemon'],
        dietTags: ['Vegan', 'Gluten-Free', 'High Protein'],
        time: 30,
        image: 'https://placehold.co/600x400/E9F3E6/2F3E2F?text=Buddha+Bowl',
        instructions:
          'Roast chickpeas. Cook quinoa. Arrange with spinach, avocado, carrot. Drizzle with tahini lemon dressing.',
      },
      {
        id: 4,
        title: 'Garlic Butter Shrimp',
        ingredients: ['shrimp', 'garlic', 'butter', 'parsley', 'lemon', 'salt', 'pepper'],
        dietTags: ['Gluten-Free', 'High Protein'],
        time: 15,
        image: 'https://placehold.co/600x400/EEF5E9/2F3E2F?text=Garlic+Shrimp',
        instructions:
          'Sauté garlic in butter, add shrimp, cook until pink. Finish with parsley and lemon.',
      },
      {
        id: 5,
        title: 'Veggie Fried Rice',
        ingredients: ['rice', 'egg', 'carrot', 'peas', 'soy sauce', 'green onion', 'sesame oil'],
        dietTags: [],
        time: 20,
        image: 'https://placehold.co/600x400/F0F4EA/2F3E2F?text=Fried+Rice',
        instructions:
          'Scramble eggs, stir-fry veggies, add rice and soy sauce. Finish with sesame oil and green onions.',
      },
      {
        id: 6,
        title: 'Caprese Salad',
        ingredients: ['tomato', 'mozzarella', 'basil', 'olive oil', 'balsamic', 'salt', 'pepper'],
        dietTags: ['Gluten-Free'],
        time: 10,
        image: 'https://placehold.co/600x400/EFF5EA/2F3E2F?text=Caprese+Salad',
        instructions:
          'Layer tomato and mozzarella. Top with basil. Drizzle oil and balsamic. Season to taste.',
      },
      {
        id: 7,
        title: 'Spicy Black Bean Tacos',
        ingredients: ['tortillas', 'black beans', 'onion', 'tomato', 'lettuce', 'cumin', 'chili powder'],
        dietTags: ['Vegan'],
        time: 20,
        image: 'https://placehold.co/600x400/ECF1E8/2F3E2F?text=Black+Bean+Tacos',
        instructions:
          'Warm beans with spices. Fill tortillas with beans, veggies, and toppings of choice.',
      },
      {
        id: 8,
        title: 'Gluten-Free Oat Pancakes',
        ingredients: ['oats', 'banana', 'egg', 'baking powder', 'milk', 'cinnamon'],
        dietTags: ['Gluten-Free'],
        time: 15,
        image: 'https://placehold.co/600x400/EBF4E3/2F3E2F?text=Oat+Pancakes',
        instructions:
          'Blend oats into flour. Mix with banana, egg, milk, baking powder, cinnamon. Cook pancakes on griddle.',
      },
      {
        id: 9,
        title: 'Tofu Stir-Fry',
        ingredients: ['tofu', 'broccoli', 'bell pepper', 'soy sauce', 'garlic', 'ginger', 'rice'],
        dietTags: ['Vegan', 'High Protein'],
        time: 25,
        image: 'https://placehold.co/600x400/F1F7EA/2F3E2F?text=Tofu+Stir-Fry',
        instructions:
          'Pan-sear tofu, stir-fry veggies, add sauce, and serve with rice.',
      },
      {
        id: 10,
        title: 'Greek Yogurt Parfait',
        ingredients: ['yogurt', 'granola', 'berries', 'honey', 'mint'],
        dietTags: ['High Protein'],
        time: 5,
        image: 'https://placehold.co/600x400/EEF3E6/2F3E2F?text=Yogurt+Parfait',
        instructions:
          'Layer yogurt, granola, and berries. Drizzle honey and garnish with mint.',
      },
      {
        id: 11,
        title: 'Lentil Soup',
        ingredients: ['lentils', 'carrot', 'celery', 'onion', 'tomato', 'garlic', 'cumin'],
        dietTags: ['Vegan', 'Gluten-Free', 'High Protein'],
        time: 40,
        image: 'https://placehold.co/600x400/EBF0E6/2F3E2F?text=Lentil+Soup',
        instructions:
          'Sauté aromatics, add lentils and tomatoes with water. Simmer until tender and season.',
      },
      {
        id: 12,
        title: 'Salmon with Dill',
        ingredients: ['salmon', 'dill', 'lemon', 'olive oil', 'salt', 'pepper'],
        dietTags: ['Gluten-Free', 'High Protein'],
        time: 20,
        image: 'https://placehold.co/600x400/E7F0E4/2F3E2F?text=Salmon+Dill',
        instructions:
          'Season salmon with oil, lemon, dill, salt and pepper. Bake or pan-sear until flaky.',
      },
      {
        id: 13,
        title: 'Mushroom Risotto',
        ingredients: ['arborio rice', 'mushroom', 'onion', 'garlic', 'stock', 'parmesan', 'butter'],
        dietTags: [],
        time: 35,
        image: 'https://placehold.co/600x400/EDF2E7/2F3E2F?text=Mushroom+Risotto',
        instructions:
          'Toast rice with onion and garlic, add stock gradually while stirring. Finish with mushrooms and parmesan.',
      },
      {
        id: 14,
        title: 'Quinoa Stuffed Peppers',
        ingredients: ['quinoa', 'bell pepper', 'tomato', 'onion', 'black beans', 'corn', 'cheese'],
        dietTags: ['Gluten-Free', 'High Protein'],
        time: 45,
        image: 'https://placehold.co/600x400/EEF6EA/2F3E2F?text=Stuffed+Peppers',
        instructions:
          'Cook quinoa and mix with veggies and beans. Stuff peppers, top with cheese, and bake.',
      },
      {
        id: 15,
        title: 'Avocado Toast Deluxe',
        ingredients: ['bread', 'avocado', 'egg', 'lemon', 'chili flakes', 'salt', 'pepper'],
        dietTags: ['High Protein'],
        time: 10,
        image: 'https://placehold.co/600x400/F2F6EC/2F3E2F?text=Avocado+Toast',
        instructions:
          'Toast bread, mash avocado with lemon and season. Top with fried or poached egg and chili flakes.',
      },
    ],
    []
  )

  // Normalization helper
  const norm = (s) => s.trim().toLowerCase()

  // Add ingredient from input
  const addIngredient = (value) => {
    const val = norm(value)
    if (!val) return
    if (ingredients.some((i) => norm(i) === val)) return
    setIngredients((prev) => [...prev, value.trim()])
    setInputValue('')
  }

  // Remove ingredient
  const removeIngredient = (idx) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx))
  }

  // Toggle diet filter
  const toggleFilter = (key) => {
    setFilters((f) => ({ ...f, [key]: !f[key] }))
  }

  // Compute matches using useMemo
  const results = useMemo(() => {
    const activeDietTags = Object.keys(filters).filter((k) => filters[k])

    const userSet = new Set(ingredients.map(norm))

    const list = recipes
      .filter((r) =>
        activeDietTags.every((tag) => r.dietTags.includes(tag))
      )
      .map((r) => {
        const ingTotal = r.ingredients.length
        const matchedCount = r.ingredients.reduce(
          (acc, ing) => (userSet.has(norm(ing)) ? acc + 1 : acc),
          0
        )
        const matchPct = Math.round((matchedCount / Math.max(ingTotal, 1)) * 100)
        return { ...r, matchedCount, matchPct, missing: r.ingredients.filter((ing) => !userSet.has(norm(ing))) }
      })
      .sort((a, b) => b.matchPct - a.matchPct)

    // show confetti if any 100% matches
    const hasPerfect = list.some((r) => r.matchPct === 100 && ingredients.length > 0)
    if (hasPerfect) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1500)
    }

    return list
  }, [recipes, ingredients, filters])

  // Modal focus trap and Esc handler
  useEffect(() => {
    if (!activeRecipe) return

    const focusableSelectors = [
      'a[href]',
      'button',
      'textarea',
      'input[type="text"]',
      'input[type="radio"]',
      'input[type="checkbox"]',
      'select',
      '[tabindex]:not([tabindex="-1"])',
    ]

    const modalEl = modalRef.current
    const focusable = modalEl ? Array.from(modalEl.querySelectorAll(focusableSelectors.join(','))) : []

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first && first.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActiveRecipe(null)
      }
      if (e.key === 'Tab' && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [activeRecipe])

  const addMissingToShoppingList = (missing) => {
    setShoppingList((prev) => {
      const set = new Set(prev.map(norm))
      const merged = [...prev]
      missing.forEach((m) => {
        if (!set.has(norm(m))) merged.push(m)
      })
      return merged
    })
  }

  const removeFromShopping = (idx) => {
    setShoppingList((prev) => prev.filter((_, i) => i !== idx))
  }

  const clearShopping = () => setShoppingList([])

  // UI helpers
  const filterButton = (label, icon) => (
    <button
      key={label}
      onClick={() => toggleFilter(label)}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors select-none ${
        filters[label]
          ? 'bg-emerald-600 text-emerald-50 border-emerald-700'
          : 'bg-emerald-50/50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
      }`}
      aria-pressed={filters[label]}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  )

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addIngredient(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && ingredients.length > 0) {
      // quick delete last
      removeIngredient(ingredients.length - 1)
    }
  }

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text')
    if (!text) return
    e.preventDefault()
    text
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach(addIngredient)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50">
      {/* Decorative organic shapes */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-300/30 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-lime-300/20 blur-3xl"></div>
      </div>

      <main className="relative max-w-6xl mx-auto p-4 sm:p-6 md:p-10">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-600 text-emerald-50 shadow-lg shadow-emerald-600/20">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 tracking-tight">PantryPal</h1>
              <p className="text-emerald-900/70 text-sm">Reverse recipe finder to reduce waste</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-900/70">
            <Leaf className="w-5 h-5" />
            <span className="text-sm">Organic look & feel</span>
          </div>
        </header>

        {/* Input & Filters card */}
        <section className="rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm p-4 sm:p-6 mb-6">
          <label htmlFor="ingredient-input" className="block text-emerald-900 font-medium mb-2">
            What do you have in your pantry?
          </label>

          {/* Tag input */}
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-emerald-300 bg-white px-3 py-2 shadow-inner focus-within:ring-2 focus-within:ring-emerald-400">
            {ingredients.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-900 px-3 py-1 text-sm"
              >
                {tag}
                <button
                  onClick={() => removeIngredient(idx)}
                  className="rounded-full w-5 h-5 grid place-items-center bg-emerald-200 hover:bg-emerald-300 text-emerald-800"
                  aria-label={`Remove ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              id="ingredient-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onPaste={handlePaste}
              placeholder="Type an ingredient and press Enter"
              className="flex-1 min-w-[12ch] outline-none py-2 text-emerald-900 placeholder-emerald-400"
            />
          </div>

          {/* Filter toggles */}
          <div className="mt-4 flex flex-wrap gap-2">
            {filterButton('Vegan', <Leaf className="w-4 h-4" />)}
            {filterButton('Gluten-Free', <span className="text-xs font-bold">GF</span>)}
            {filterButton('High Protein', <span className="text-xs font-bold">HP</span>)}
          </div>
        </section>

        {/* Results header and shopping list quick view */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold text-emerald-900">
            {ingredients.length === 0 ? 'Popular ideas' : 'Matches for your ingredients'}
          </h2>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-900 flex items-center gap-2">
            <span className="font-medium">Shopping List:</span>
            {shoppingList.length === 0 ? (
              <span className="text-emerald-800/60">empty</span>
            ) : (
              <span className="text-emerald-800">{shoppingList.length} item(s)</span>
            )}
            {shoppingList.length > 0 && (
              <button onClick={clearShopping} className="ml-2 text-emerald-700 hover:underline">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results grid */}
        <section
          aria-live="polite"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {results.map((r) => (
            <article
              key={r.id}
              className="group rounded-2xl bg-white border border-emerald-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setActiveRecipe(r)}
                className="text-left w-full"
                aria-haspopup="dialog"
                aria-controls={`recipe-${r.id}`}
              >
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <img
                    src={r.image}
                    alt="Recipe"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-2 left-2 rounded-full bg-emerald-900/90 text-emerald-50 text-xs px-2 py-1 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {r.time}m
                  </div>
                  <div
                    className={`absolute top-2 right-2 rounded-full text-xs px-2 py-1 font-semibold ${
                      r.matchPct === 100
                        ? 'bg-emerald-500 text-emerald-50'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {r.matchPct}% match
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-emerald-900 mb-1">{r.title}</h3>
                  <p className="text-emerald-900/70 text-sm line-clamp-2">
                    {r.ingredients.slice(0, 5).join(' • ')}
                    {r.ingredients.length > 5 ? ' • …' : ''}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </section>

        {/* Confetti cue */}
        {showConfetti && (
          <ConfettiBurst />
        )}

        {/* Shopping list drawer-like section for mobile */}
        {shoppingList.length > 0 && (
          <section className="mt-6 rounded-2xl bg-white border border-emerald-200 shadow-sm p-4">
            <h3 className="font-semibold text-emerald-900 mb-3">Shopping List</h3>
            <ul className="flex flex-wrap gap-2">
              {shoppingList.map((item, idx) => (
                <li key={`${item}-${idx}`} className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-900 px-3 py-1 text-sm">
                  {item}
                  <button
                    onClick={() => removeFromShopping(idx)}
                    className="rounded-full w-5 h-5 grid place-items-center bg-emerald-200 hover:bg-emerald-300 text-emerald-800"
                    aria-label={`Remove ${item}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      {/* Modal */}
      {activeRecipe && (
        <div
          role="dialog"
          aria-modal="true"
          id={`recipe-${activeRecipe.id}`}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-emerald-900/50 backdrop-blur-sm"
            onClick={() => setActiveRecipe(null)}
          />

          <div
            ref={modalRef}
            className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-auto rounded-t-2xl sm:rounded-2xl bg-white border border-emerald-200 shadow-xl p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-900">{activeRecipe.title}</h3>
              <button
                onClick={() => setActiveRecipe(null)}
                className="rounded-full px-3 py-1 bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
              >
                Close
              </button>
            </div>

            <img
              src={activeRecipe.image}
              alt="Recipe"
              className="w-full h-48 sm:h-60 object-cover rounded-xl mb-4"
            />

            <div className="flex items-center gap-2 text-emerald-900/80 text-sm mb-4">
              <div className="inline-flex items-center gap-1 bg-emerald-50 rounded-full px-2 py-1 border border-emerald-200">
                <Clock className="w-3 h-3" /> {activeRecipe.time} minutes
              </div>
              {activeRecipe.dietTags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 bg-emerald-50 rounded-full px-2 py-1 border border-emerald-200">
                  {t}
                </span>
              ))}
              <span className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                activeRecipe.matchPct === 100 ? 'bg-emerald-500 text-emerald-50' : 'bg-emerald-100 text-emerald-900'
              }`}>
                {activeRecipe.matchPct}% match
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-emerald-900 mb-2">Ingredients</h4>
              <ul className="list-disc pl-5 text-emerald-900/90">
                {activeRecipe.ingredients.map((i) => (
                  <li key={i} className={ingredients.map(norm).includes(norm(i)) ? '' : 'opacity-70'}>
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-emerald-900 mb-2">Instructions</h4>
              <p className="text-emerald-900/80 leading-relaxed">{activeRecipe.instructions}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => addMissingToShoppingList(activeRecipe.missing)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 text-emerald-50 px-4 py-2 hover:bg-emerald-700 transition-colors"
              >
                Add missing ingredients to list
              </button>
              <button
                onClick={() => {
                  // add all ingredients (optional helper)
                  addMissingToShoppingList(activeRecipe.ingredients.filter((i) => !ingredients.map(norm).includes(norm(i))))
                }}
                className="text-emerald-900/70 hover:text-emerald-900 underline"
              >
                Add all missing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ConfettiBurst() {
  // Simple, dependency-free confetti burst using absolutely positioned dots
  // Appears centered near the top after perfect match
  const pieces = 28
  const dots = Array.from({ length: pieces })
  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-start justify-center pt-24">
      <div className="relative w-0 h-0">
        {dots.map((_, i) => {
          const angle = (i / pieces) * Math.PI * 2
          const distance = 80 + (i % 5) * 12
          const x = Math.cos(angle) * distance
          const y = Math.sin(angle) * distance
          const delay = (i % 7) * 30
          const colorClasses = [
            'bg-emerald-500',
            'bg-lime-500',
            'bg-emerald-400',
            'bg-lime-400',
            'bg-emerald-600',
          ]
          const color = colorClasses[i % colorClasses.length]
          return (
            <span
              key={i}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                animationDelay: `${delay}ms`,
              }}
              className={`absolute left-0 top-0 w-2 h-2 rounded-full ${color} animate-pop-fade`}
            />
          )
        })}
      </div>
    </div>
  )
}

// Tailwind keyframes (using arbitrary variants)
// Define animation via CSS-in-JS style tag to ensure availability
const style = document.createElement('style')
style.innerHTML = `
@keyframes pop-fade {
  0% { opacity: 0; transform: scale(0.3) translate(0,0); }
  10% { opacity: 1; }
  100% { opacity: 0; transform: scale(1) translate(0,0); }
}
.animate-pop-fade { animation: pop-fade 900ms ease-out forwards; }
`
document.head.appendChild(style)

export default App
