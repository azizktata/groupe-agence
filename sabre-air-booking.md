This documentation provides a comprehensive roadmap for integrating the Sabre GDS workflow into your flight booking engine. It covers the logic, request parameters, and response structures for each phase.

---

# 🛫 Sabre Air Booking System: Integration Guide

This document outlines the 5-step process for moving from a flight search to a confirmed booking (PNR) using Sabre's REST APIs.

## 🔗 Environment Base URLs

* **REST API Endpoint:** `https://api.platform.sabre.com/v5/` (Production)
* **REST API Endpoint:** `https://api.cert.platform.sabre.com/v5/` (Certification/Test)

---

## 🔍 Step 1: Bargain Finder Max (BFM)

### Objectif

Effectuer une recherche large afin d’identifier les tarifs les plus bas disponibles auprès d’un ou plusieurs transporteurs, sur la base de critères définis (dates, itinéraires, passagers, préférences).

### API

* **Endpoint** :

  `POST /v5/offers/shop/`
* **Finalité** :

  Retourner une liste d’itinéraires tarifés (aller simple ou aller-retour) avec leurs détails complets (vols, taxes, règles tarifaires).

---

### Paramètres principaux de la requête

| Paramètre                                                 | Type   | Description                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OriginDestinationInformation`                           | Array  | Définition des trajets (dates, aéroports d’origine et de destination). Supporte aller-retour ou multi-segments.<br />**One-Way:** Include **one** object in `OriginDestinationInformation`, **Round-Trip:** Include **two** objects, **Multi-City:** Include **three or more** objects |
| `TravelPreferences.MaxStopsQuantity`                     | Number | Nombre maximum d’escales (`0`pour vols directs).                                                                                                                                                                                                                                                                               |
| `TravelPreferences.VendorPref`                           | Array  | Compagnies aériennes autorisées (codes IATA).                                                                                                                                                                                                                                                                                   |
| `TravelerInfoSummary`                                    | Object | Répartition des passagers (ADT, CNN, INF).                                                                                                                                                                                                                                                                                       |
| `TPA_Extensions.IntelliSellTransaction.RequestType.Name` | String | Nombre maximal d’itinéraires retournés (ex.`50ITINS`).                                                                                                                                                                                                                                                                       |

---

### Exemple de requête (BFM)

<pre class="overflow-visible! px-0!" data-start="1645" data-end="2708" data--h-bstatus="0OBSERVED"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" data--h-bstatus="0OBSERVED"><div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]" data--h-bstatus="0OBSERVED"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" data--h-bstatus="0OBSERVED"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" data--h-bstatus="0OBSERVED"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" data--h-bstatus="0OBSERVED"><code class="whitespace-pre! language-json" data--h-bstatus="0OBSERVED"><span data--h-bstatus="0OBSERVED"><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
  </span><span data--h-bstatus="0OBSERVED">"OTA_AirLowFareSearchRQ"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"Version"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"5"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"POS"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"Source"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"PseudoCityCode"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"XXXX"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"RequestorID"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Type"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"1"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"ID"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"1"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"CompanyName"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"Code"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"TN"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"OriginDestinationInformation"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"DepartureDateTime"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"2026-09-11T20:00:00"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"OriginLocation"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"LocationCode"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"WAW"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"DestinationLocation"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"LocationCode"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"SPU"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"DepartureDateTime"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"2026-09-18T20:00:00"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"OriginLocation"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"LocationCode"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"SPU"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"DestinationLocation"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"LocationCode"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"WAW"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"TravelPreferences"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"MaxStopsQuantity"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">0</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"VendorPref"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"Code"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"LO"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"TravelerInfoSummary"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"AirTravelerAvail"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"PassengerTypeQuantity"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Code"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"ADT"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Quantity"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">1</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"TPA_Extensions"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"IntelliSellTransaction"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"RequestType"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"Name"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"50ITINS"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
  </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
</span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
</span></span></code></div></div></pre>

---

### Éléments clés de la réponse BFM

| Élément                        | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `itineraryGroups`              | Liste des itinéraires proposés avec leurs prix.    |
| `scheduleDescs`                | Détails des vols (horaires, appareils, compagnies). |
| `fareComponentDescs`           | Composants tarifaires (fare basis, cabine, règles). |
| `taxDescs`/`taxSummaryDescs` | Taxes détaillées et résumées.                    |
| `totalFare`                    | Prix total incluant taxes et devise.                 |
| `baggageAllowanceDescs`        | Franchise bagages associée à l’itinéraire.       |

⚠️ **Important** : Les prix retournés à cette étape ne sont pas garantis et doivent être revalidés avant toute réservation.

---

## Step 2: Revalidate Itinerary

### Objectif

Vérifier en temps réel que l’itinéraire sélectionné à l’étape 1 est toujours disponible, que la classe tarifaire existe encore et que le prix n’a pas changé.

Cette étape est obligatoire avant la création de la réservation.

---

### API

* **Endpoint** :

  `POST /v5/shop/flights/revalidate/`
* **Finalité** :

  Confirmer la disponibilité exacte d’un vol (numéro, classe, horaires) et recalculer le tarif final.

---

### Paramètres clés de la revalidation

| Paramètre                                             | Description                                                     |
| ------------------------------------------------------ | --------------------------------------------------------------- |
| `TPA_Extensions.VerificationItinCallLogic.Value`     | Doit être défini à `"L"`pour activer le mode revalidation. |
| `OriginDestinationInformation.TPA_Extensions.Flight` | Vol précis à revalider (numéro, dates, classe, compagnies).  |
| `TravelerInfoSummary`                                | Doit correspondre exactement à la recherche initiale.          |

---

### Exemple de requête (Revalidation)

<pre class="overflow-visible! px-0!" data-start="4275" data-end="5420" data--h-bstatus="0OBSERVED"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" data--h-bstatus="0OBSERVED"><div class="sticky top-[calc(var(--sticky-padding-top)+9*var(--spacing))]" data--h-bstatus="0OBSERVED"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" data--h-bstatus="0OBSERVED"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" data--h-bstatus="0OBSERVED"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" data--h-bstatus="0OBSERVED"><code class="whitespace-pre! language-json" data--h-bstatus="0OBSERVED"><span data--h-bstatus="0OBSERVED"><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
  </span><span data--h-bstatus="0OBSERVED">"OTA_AirLowFareSearchRQ"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"Version"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"5"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"POS"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"Source"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"PseudoCityCode"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"XXXX"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"RequestorID"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Type"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"1"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"ID"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"1"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"CompanyName"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"Code"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"TN"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"OriginDestinationInformation"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"DepartureDateTime"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"2026-09-11T06:55:00"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"OriginLocation"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"LocationCode"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"LHR"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"DestinationLocation"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"LocationCode"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"FRA"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"TPA_Extensions"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"Flight"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Type"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"A"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Number"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">902</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"ClassOfService"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"V"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"DepartureDateTime"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"2026-09-11T06:55:00"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"ArrivalDateTime"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"2026-09-11T09:30:00"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Airline"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
            </span><span data--h-bstatus="0OBSERVED">"Marketing"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"BA"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
            </span><span data--h-bstatus="0OBSERVED">"Operating"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"BA"</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"TravelPreferences"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"MaxStopsQuantity"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">0</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"TPA_Extensions"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"VerificationItinCallLogic"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"Value"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"L"</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">"TravelerInfoSummary"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">"AirTravelerAvail"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">"PassengerTypeQuantity"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">[</span><span data--h-bstatus="0OBSERVED">{</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Code"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">"ADT"</span><span data--h-bstatus="0OBSERVED">,</span><span data--h-bstatus="0OBSERVED">
          </span><span data--h-bstatus="0OBSERVED">"Quantity"</span><span data--h-bstatus="0OBSERVED">:</span><span data--h-bstatus="0OBSERVED"></span><span data--h-bstatus="0OBSERVED">1</span><span data--h-bstatus="0OBSERVED">
        </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">
      </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">]</span><span data--h-bstatus="0OBSERVED">
    </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
  </span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
</span><span data--h-bstatus="0OBSERVED">}</span><span data--h-bstatus="0OBSERVED">
</span></span></code></div></div></pre>

To successfully revalidate an itinerary, you must effectively "reconstruct" the flight details from the BFM response into the Revalidate request. The Sabre engine uses these specific values to find the exact same seat in the live inventory.

Here is the exact mapping of what you need to extract from the **Step 1 (BFM Response)** and where to place it in the **Step 2 (Revalidate Request)**.

### 🛠️ Data Mapping Table

| **Data Required**          | **Field in BFM Response (Step 1)**                                                                                                                              | **Destination in Revalidate Request (Step 2)** |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Marketing Carrier Code** | `scheduleDescs[].carrier.marketing`                                                                                                                                 | `Airline.Marketing`                                |
| **Operating Carrier Code** | `scheduleDescs[].carrier.operating`                                                                                                                                 | `Airline.Operating`                                |
| **Flight Number**          | `scheduleDescs[].carrier.marketingFlightNumber`                                                                                                                     | `Number`                                           |
| **Booking Class**          | `passengerInfo.fareComponents[].segments[].segment.bookingCode`                                                                                                     | `ClassOfService`                                   |
| **Airport Codes**          | `scheduleDescs[].departure.airport` / `arrival.airport`                                                                                                           | `OriginLocation` / `DestinationLocation`         |
| **Departure Time **              | `itineraryGroups[].groupDescription.legDescriptions[0].departureDate` T `scheduleDescs[].departure.time`                                                          | `DepartureDateTime`                                |
| **Arrival Time **                | `itineraryGroups[].groupDescription.legDescriptions[1].departureDate` T `scheduleDescs[].arrival.time<br>``<br>`// legDescriptions[1] assuming it is round trip | `ArrivalDateTime`                                  |
| **Passenger Type**         | `itineraries[].pricingInformation[].passengerInfoList[].passengerInfo.passengerType`                                                                                | `PassengerTypeQuantity.Code`                       |
| Passenger Qty                    | `itineraries[].pricingInformation[].passengerInfoList[].length()`                                                                                                   | ``PassengerTypeQuantity.Quantity``                   |


### Résultat attendu de la revalidation

* Confirmation de la **disponibilité réelle** du vol et de la classe.
* Tarif final recalculé (`totalFare.totalPrice`).
* Indication des conditions tarifaires finales (remboursable / non remboursable).
* Dernière date et heure d’émission (`lastTicketDate`, `lastTicketTime`).

#### NOTES

### 1. How to spot a "One-Way" in the Revalidate Response

In the BA (British Airways) response you provided:

* **`itineraryGroups[0].groupDescription.legDescriptions`** : Only contains **one** object (LHR to FRA).
* **`itineraries[0].legs`** : Only contains **one** reference (`ref: 1`).
* **`fareComponentDescs`** : Only has **one** component with `directionality: "FROM"`.

### 2. How to spot a "Round-Trip" in the BFM Response

In your first LOT Polish response:

* **`itineraryGroups[0].groupDescription.legDescriptions`** : Contains **two** objects (WAW to SPU and SPU to WAW).
* **`itineraries[0].legs`** : Contains **two** references (`ref: 2` and `ref: 1`).
* **`fareComponentDescs`** : Contains **two** components, one `directionality: "FROM"` and one `directionality: "TO"`.



## 💺 Step 3 & 4: Get Seats & Ancillaries (Optional)

**Purpose:** Enhancing the user experience by allowing seat selection and purchasing extra baggage.

### API Details

* **Seat Map:** `POST /v5/lists/utilities/seatmap`
* **Ancillaries:** `POST /v5/shopping/flight/ancillaries`

### Data Required

* **Carrier Code & Flight Number.**
* **Departure/Arrival Cities.**

---

## 🎟️ Step 5: Create Booking (The Final Step)

**Purpose:** To officially create the Passenger Name Record (PNR). This reserves the seat and generates the 6-digit confirmation code.

### API Details

* **Endpoint:** `POST /v1/trip/orders/createBooking`
* **Action:** Combines passenger data, flight selection, and pricing into one command.

### Key Request Parameters

* **`PersonName`** : Full name of the traveler (must match passport).
* **`ContactInfo`** : Email and phone number.
* **`FlightSegment`** : The verified flight details from Step 2.

### Expected Result

* **`ItineraryRef`** : The 6-character Sabre Record Locator (e.g., `ABCDEF`).
* **`AirlineConfirmationID`** : The airline's own reference code.

---

## 🛠️ System Workflow Summary

1. **Search:** User enters "WAW to SPU" → System calls **BFM** → Displays List.
2. **Select:** User clicks "Select" → System calls **Revalidate** → Shows "Verifying" Loader.
3. **Review:** System displays the **Review Page** with verified price and baggage info.
