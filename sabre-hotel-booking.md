# Sabre Lodging API: Technical Reference

The following sequence represents the industry-standard "Shopping" flow for hotel integration.

## 📋 1. Get Hotel List API

The `GetHotelListRQ` is your primary tool for retrieving property metadata. It supports two main modes: **Discovery** (filtering by criteria) and **Specific** (fetching info for known IDs).

POST /v4.1.0/get/hotellist

### A. Discovery Mode (Search by Criteria)

Use this when you don't have Hotel IDs yet. Note that `HotelPref` becomes **mandatory** if `HotelRefs` is empty.

**Request Example:**

**JSON**

```
{
  "GetHotelListRQ": {
    "HotelPref": {
       "HotelName": "Resort",
      "BrandCodes": {
        "BrandCode": [
          "10008",
          "10009"
        ]
      },
      "ChainCodes": { "ChainCode": ["HY"] },
      "SabreRating": { "Min": "4.5", "Max": "5.0" },
      "AmenityCodes": {
        "Inclusive": false,
        "AmenityCode": [
          15,
          16
        ]
      },
      "SecurityFeatureCodes": {
        "Inclusive": false,
        "SecurityFeatureCode": [
          15
        ]
      },
      "PropertyTypeCodes": {
        "Inclusive": false,
        "PropertyTypeCode": [
          15,
          16
        ]
      },
      "PropertyQualityCodes": {
        "Inclusive": false,
        "PropertyQualityCode": [
          15,
          16
        ]
      },
    "HotelInfoRef": {
      "Amenities": true,
      "LocationInfo": true,
      "PropertyTypeInfo": true,
      "PropertyQualityInfo": true,
      "SecurityFeatures": true
    }
   
    }
  }
}
```

what you can use to filter your "Discovery" results:

| **Property**                 | **Type** | **How to use it**                                             |
| ---------------------------------- | -------------- | ------------------------------------------------------------------- |
| **`HotelName`**            | String         | Find hotels containing a string (e.g., "Sheraton").*Min 3 chars.* |
| **`ChainCodes`**           | Array          | Filter by 2-letter codes (e.g.,`["HL", "HY"]`).                   |
| **`AmenityCodes`**         | Array          | Show only hotels with "WiFi" (179) or "Pool" (71).                  |
| **`SabreRating`**          | Object         | Use `Min`and `Max`(e.g.,`4.0`to `5.0`).                     |
| **`PropertyTypeCodes`**    | Array          | Filter for "Resort", "Apartment", or "Hotel".                       |
| **`PropertyQualityCodes`** | Array          | Filter by service level (Luxury, Economy, etc.).                    |
| **`SecurityFeatureCodes`** | Array          | Filter by safety features (e.g., "24hr Security").                  |

### B. Specific Mode (With Info Toggles)

Use this to fetch specific details (Location, Amenities, etc.) for known `HotelCodes`. Use the `HotelInfoRef` flags to keep the response lightweight.

**Request Example:**

**JSON**

```
{
  "GetHotelListRQ": {
    "version": "4.1.0",
    "HotelRefs": {
      "HotelRef": [{ "HotelCode": "100011884", "CodeContext": "GLOBAL" }]
    },
    "HotelInfoRef": {
      "LocationInfo": true,
      "Amenities": true,
      "PropertyTypeInfo": true,
      "PropertyQualityInfo": true,
      "SecurityFeatures": true
    }
  }
}
```

### Handy Reference Arrays (Mapping Tables)

When the API returns numeric codes (e.g., `Code: 179`), use these tables to map them to user-friendly labels in your UI.

#### Common Amenity Codes (`Amenities`)

| **Code** | **Description**                 | **UI Category** |
| -------------- | ------------------------------------- | --------------------- |
| **179**  | Wireless internet connection (Public) | Connectivity          |
| **259**  | High speed internet access            | Connectivity          |
| **227**  | Complimentary breakfast               | Dining                |
| **42**   | Free parking                          | Facilities            |
| **54**   | Indoor pool                           | Recreation            |
| **48**   | Health club / Gym                     | Recreation            |
| **282**  | Airport shuttle service               | Transport             |

#### Security Feature Codes (`SecurityFeatures`)

| **Code** | **Description**    |
| -------------- | ------------------------ |
| **9**    | Complies with Fire Laws  |
| **39**   | Restricted public access |

#### Regional Chain Code Mapping

| **Country**         | **Key Chain Codes**                 | **Major Brands Represented**                             |
| ------------------------- | ----------------------------------------- | -------------------------------------------------------------- |
| **Côte d’Ivoire** | `AA`,`SI`,`MA`,`RA`               | Accor (Sofitel/Pullman), Sheraton, Marriott, Radisson.         |
| **Egypt**           | `HI`,`HL`,`SI`,`MS`,`MC`,`FS` | Hilton, Sheraton, Mövenpick (MS), Marriott, Four Seasons.     |
| **Emirates (UAE)**  | `JU`,`EK`,`HL`,`MA`,`RA`,`RZ` | Jumeirah (JU), Rotana (RT/EK), Hilton, Marriott, Ritz-Carlton. |
| **Qatar**           | `MC`,`RA`,`FS`,`HL`,`JU`,`W`  | Marriott, Radisson, Four Seasons, Hilton, Jumeirah, W Hotels.  |

#### Property Quality Codes (LOS)

| **Code** | **Meaning**      |
| -------------- | ---------------------- |
| **4**    | Luxury / Deluxe        |
| **5**    | First Class / Superior |
| **6**    | Moderate / Economy     |

## Get Hotel Image API

**Purpose:** Fetches visual content URLs for up to 300 properties in a single request.

### API Details

* **Endpoint:** POST /v1.0.0/shop/hotels/image
* **Capacity:** Max 300 `HotelCodes` per request.
* **Legal Constraint:** **No Caching.** Images must be fetched live to ensure they reflect the most recent updates from the property owners.

### Key Request Parameters

| **Parameter** | **Type** | **Description**                                         |
| ------------------- | -------------- | ------------------------------------------------------------- |
| `HotelRefs`       | Array          | List of `HotelCode`and `CodeContext`.                     |
| `ImageRef`        | Object         | Specify `Type`(ORIGINAL, THUMBNAIL, SMALL, MEDIUM, LARGE).  |
| `CategoryCodes`   | Array          | Filter by PIC categories (e.g., Guest Room, Lobby, Exterior). |
| `LanguageCode`    | String         | ISO language code for captions (e.g., "FR" for French).       |

### Request Structure

You can batch up to  **300 HotelCodes** . For a search result page, we recommend requesting `MEDIUM` or `LARGE`.

**Example Request:**

**JSON**

```
{
  "GetHotelImageRQ": {
    "version": "1.0.0",
    "HotelRefs": {
      "HotelRef": [
        { "HotelCode": "100005094", "CodeContext": "GLOBAL" }
      ]
    },
    "ImageRef": {
      "Type": "LARGE",
      "CategoryCode": 1, 
      "LanguageCode": "EN"
    }
  }
}
```

**Example Response:
JSON**
`{   "GetHotelImageRS": {     "version": "1.0.0",     "ApplicationResults": {       "status": "COMPLETE",       "Success": [         {           "timeStamp": "2024-05-20T10:15:30.000-05:00",           "type": "APPLICATION"         }       ]     },     "HotelImageInfos": {       "HotelImageInfo": [         {           "HotelInfo": {             "HotelCode": "100005094",             "CodeContext": "GLOBAL",             "ChainCode": "HY",             "Logo": "https://images.sabre.com/logos/chains/HY_logo.png"           },           "ImageItem": {             "Id": "img_992831",             "Ordinal": 1,             "Format": "JPG",             "LastModifedDate": "2023-12-01T08:00:00",             "Image": {               "Url": "https://images.sabre.com/hotels/100005094/ext_view_large.jpg",               "Type": "LARGE",               "Height": 800,               "Width": 1200             },             "Category": {               "CategoryCode": 1,               "Description": {                 "Text": [                   { "content": "Hotel Exterior", "Language": "EN" },                   { "content": "Extérieur de l'hôtel", "Language": "FR" }                 ]               }             },             "AdditionalInfo": {               "Info": [                 {                   "Type": "CAPTION",                   "Description": {                     "Text": [{ "content": "Main entrance and facade at sunset", "Language": "EN" }]                   }                 }               ]             }           }         }       ]     }   } }`

## 💰 2. Get Hotel Availability API


### 🗓️ Get Hotel Availability API (Transactional Search)

The `Get Hotel Avail` API is the engine for real-time commerce. Unlike the Discovery API, this endpoint validates  **live inventory** , calculates  **actual pricing** , and allows for **location-based** searches (Geo-search).

#### 1. Core Purpose

* **Price Discovery:** Retrieves the "Lead Rate" (lowest available price) for properties.
* **Transactional Search:** Filters results based on specific stay dates and occupancy.
* **Geo-Optimization:** Internally leverages the Geo Search API to find hotels by coordinates, airport codes, or physical addresses.

---

#### 2. Request Payload Schema

The `GetHotelAvailRQ` is divided into two logical halves: **Where** you are looking (`GeoSearch` or `HotelRefs`) and **How** you want the rates (`RateInfoRef`).

#### 1. Search Criteria Headers

* **`Offset`** : (Optional) Used for pagination.
* **`PageSize`** : (Optional) `1–200`.
* **`SortBy`** : `DistanceFrom`, `SabreRating`, `AverageNightlyRate`, `AverageNightlyRateBeforeTax`.
* **`ShopKey`** : If used, all other parameters except `Offset` are ignored.

#### 2. The Geographical Anchor (`GeoSearch`)

* **`GeoRef`** :
* `Radius`: (Integer) Distance value.
* `UOM`: `KM` or `MI`.
* **One of the following:**
  * `GeoCode`: `{ "Latitude": float, "Longitude": float }`
  * `RefPoint`: `{ "Value": string, "ValueContext": "CODE"|"NAME", "RefPointType": "6"|"7"|"11"|"16"|"37" }`
  * `AddressRef`: `{ "CountryCode": "US", "City": "New York", ... }`

#### 3. Rate & Room Configuration (`RateInfoRef`)

This section defines the stay period and who is staying.

* **`BestOnly`** :
* `1`: Global lowest rate.
* `2`: Lowest rate per source (GDS vs Aggregator).
* **`StayDateTimeRange`** : `{ "StartDate": "YYYY-MM-DD", "EndDate": "YYYY-MM-DD" }`
* **`Rooms`** : Contains an array of `Room` objects.
* **`Index`** : (Mandatory) Must be sequential (`1`, `2`, `3`).
* **`Adults`** : (Mandatory) Number of adults.
* **`Children`** : (Optional) Total count of children.
* **`ChildAges`** : (Required if Children > 0) String of ages separated by commas (e.g., `"5,12"`).

---

#### 3. Rate Filtering & Business Logic

This API allows you to control the "quality" of financial results returned to the user:

* **Commission Filter:** Exclude non-commissionable rates (`Value="NC"`) to ensure agency profitability.
* **Rate Types:** Filter for specific categories like `Government`, `AAA`, or `Senior` rates.
* **Negotiated Rates:** Use `RatePlanCandidate` to fetch private/contracted rates for corporate clients (e.g., IBM or AMX codes).


### Request Example

**JSON**

```
{
  "GetHotelAvailRQ": {
    "version": "5.0.0",
    "SearchCriteria": {
      "OffSet": 1,
      "PageSize": 50,
      "SortBy": "AverageNightlyRate",
      "SortOrder": "DESC",
      "GeoSearch": {
        "GeoRef": {
          "Radius": 10,
          "UOM": "MI",
          "GeoCode": {
            "Latitude": 34.0522,
            "Longitude": -118.2437
          }
        }
      },
      "RateInfoRef": {
        "CurrencyCode": "USD",
        "BestOnly": "1",
        "StayDateTimeRange": {
          "StartDate": "2026-05-15",
          "EndDate": "2026-05-20"
        },
        "Rooms": {
          "Room": [
            {
              "Index": 1,
              "Adults": 2,
              "Children": 1,
              "ChildAges": "8"
            }
          ]
        }
      }
    }
  }
}
```

### ⚠️ Integration Rules for your System

1. **Sequential Indexing** : If a user selects "3 Rooms" in your UI, your code must generate three objects in the `Room` array with `Index: 1`, `Index: 2`, and `Index: 3`.
2. **Child Ages** : If your search form has a child selector, you **must** collect their ages. Aggregators (like Expedia or Booking.com content inside Sabre) will fail the request if ages are missing.
3. **Maximum Distance** : Ensure your UI limits the `Radius` to **200 Miles** or  **320 Kilometers** , as the API will throw an error beyond this.

---

#### 4. The Response Payload (Lead Rates)

The orchestrated response returns a hybrid of static and dynamic data:

* **Hotel Summary:** Basic metadata and the  **Leading Image** .
* **Price Point:** The lowest available `AverageNightlyRate` for the stay period.
* **Distance:** Precise distance from the search center point.

---

## 🔍 3. Hotel Content & Details (v4)

The `GetHotelContent` API is used when a user clicks a hotel card to view the full details. It merges static descriptive text with all available media (Images, 360 Panoramas, and Videos).

## 📋 1. API Overview

* **Purpose** : Orchestrates location info, amenities, payment forms, and rich media into a single response.
* **Key Benefit** : No need to call separate APIs for images and descriptions once you are on the property page.
* **Limit** : Single property search per request.

## 🛠️ 2. Request Configuration (Hotel Details)

To get a complete UI, you must set specific flags to `true`.

### Essential Description Types:

| **Type**                 | **Description**                 | **UI Section**      |
| ------------------------------ | ------------------------------------- | ------------------------- |
| **`ShortDescription`** | High-level summary of the property.   | Top "About" section.      |
| **`Dining`**           | On-site restaurants and meal plans.   | Dining tab/section.       |
| **`Facilities`**       | Meeting rooms, business centers, etc. | "What this place offers". |
| **`Policies`**         | Check-in/out times, Pet policies.     | Sidebar/Footer info.      |
| **`SafetyInfo`**       | Security and fire law compliance.     | Trust/Safety badge.       |
| **`Attractions`**      | Nearby landmarks and distances.       | Location/Map section.     |

### Media Preferences:

Request `ORIGINAL` for high-quality galleries and `HD360` for interactive panoramic views.

### Sample Request (Minimal Details)

**JSON**

```
{
  "GetHotelContentRQ": {
    "version": "4.0.0",
    "SearchCriteria": {
      "HotelRefs": { "HotelRef": { "HotelCode": "100005424" } },
      "DescriptiveInfoRef": {
        "PropertyInfo": true,
        "LocationInfo": true,
        "Amenities": true,
        "Descriptions": 
           { "Description": [{ "Type": "ShortDescription" }, { "Type": "Dining" }] }
      },
      "MediaRef": 
{ "MaxItems": "ALL", "MediaTypes": { "Images": { "Image": [{ "Type": "ORIGINAL" }] }}}
    }
  }
}
```

### Data Mapping Table: API to UI

| **UI Section**      | **JSON Path (GetHotelContentRS.HotelContentInfos.HotelContentInfo)**   | **Logic / Transformation**                      |
| ------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Hero Title**      | `HotelInfo.HotelName`                                                      | Render as `<h1>`.                                   |
| **Trust Badges**    | `HotelInfo.SabreRating`                                                    | Convert "3.0" to Star icons.                          |
| **Hero Gallery**    | `HotelMediaInfo.MediaItems.MediaItem[]`                                    | Map `ImageItems.Image[0].Url`. Sort by `Ordinal`. |
| **Quick Summary**   | `HotelDescriptiveInfo.PropertyInfo.PropertyTypeInfo`                       | Join descriptions (e.g., "All suite, Extended stay"). |
| **Check-in/Out**    | `HotelDescriptiveInfo.PropertyInfo.Policies.Policy`                        | Filter by `Type="CheckIn"`and `Type="CheckOut"`.  |
| **Amenities Grid**  | `HotelDescriptiveInfo.Amenities.Amenity[]`                                 | Map `Description`to an icon list.                   |
| **About Section**   | `HotelDescriptiveInfo.Descriptions.Description[Type="ShortDescription"]`   | Clean whitespace from `Text.value`.                 |
| **Dining Details**  | `HotelDescriptiveInfo.Descriptions.Description[Type="Dining"]`             | Render as "Dining & Restaurants" text block.          |
| **Nearby List**     | `HotelDescriptiveInfo.Descriptions.Description[Type="Attractions"]`        | Parse distances (e.g., "1 MI E") from the string.     |
| **Safety/Security** | `HotelDescriptiveInfo.SecurityFeatures.SecurityFeature[]`                  | List `Description`for "Safety & Security" section.  |
| **Policy Details**  | `HotelDescriptiveInfo.Descriptions.Description[Type="CancellationPolicy"]` | Use for "Cancellation Rules" fine print.              |

---

## 💡 Summary of the "Chain"

1. **Get Hotel List:** "Give me all Hilton hotels in Paris." → Returns  **IDs** .
2. **Get Hotel Avail:** "Which of these Hiltons are free May 1st-5th and how much is the cheapest?" → Returns  **Lowest Price** .
3. **Get Hotel Details:** "For Hilton Paris Opera, show me all King and Queen rooms with their specific cancellation rules." → Returns  **All Options** .
